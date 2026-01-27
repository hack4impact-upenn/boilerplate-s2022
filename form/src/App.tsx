import { useEffect, useMemo, useState } from 'react';
import { API_PREFIX, getJson, postJson } from './api';
import { flavors } from './questions';
import { DiscountResponse, OrderPayload, PopcornFlavor, PopcornPrices } from './types';

const EMPTY_QUANTITIES: PopcornPrices = {
  caramel: 0,
  respresso: 0,
  butter: 0,
  cheddar: 0,
  kettle: 0,
};

const DEFAULT_PRICES: PopcornPrices = {
  caramel: 5.75,
  respresso: 5.75,
  butter: 5.75,
  cheddar: 5.75,
  kettle: 5.75,
};

function getCodeFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('code');
  if (fromQuery) {
    return fromQuery.trim();
  }

  const path = window.location.pathname.replace(/^\/+/, '');
  if (!path) {
    return '';
  }

  const [firstSegment] = path.split('/');
  return firstSegment || '';
}

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState<DiscountResponse | null>(null);
  const [loadingDiscount, setLoadingDiscount] = useState(true);
  const [loadingBasePrices, setLoadingBasePrices] = useState(false);
  const [basePrices, setBasePrices] = useState<PopcornPrices>({
    ...DEFAULT_PRICES,
  });
  const [discountError, setDiscountError] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phoneNumber: '',
    email: '',
    shippingAddress1: '',
    shippingAddress2: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    popcornQuantities: { ...EMPTY_QUANTITIES },
  });

  const steps = useMemo(() => {
    return [
      { type: 'contact' },
      { type: 'shipping' },
      ...flavors.map((flavor) => ({ type: 'flavor', flavor })),
      { type: 'summary' },
    ];
  }, []);

  const totalSteps = steps.length;

  const prices = useMemo(() => {
    if (discount?.popcornPrices) {
      return discount.popcornPrices;
    }
    if (discount?.price !== undefined) {
      return {
        caramel: discount.price,
        respresso: discount.price,
        butter: discount.price,
        cheddar: discount.price,
        kettle: discount.price,
      };
    }
    return basePrices;
  }, [basePrices, discount]);

  const totalCost = useMemo(() => {
    return flavors.reduce((sum, flavor) => {
      const quantity = formData.popcornQuantities[flavor.key] || 0;
      const price = prices[flavor.key] || 0;
      return sum + quantity * price;
    }, 0);
  }, [formData.popcornQuantities, prices]);

  useEffect(() => {
    const code = getCodeFromUrl();
    setDiscountCode(code);

    if (!code) {
      setDiscount(null);
      setLoadingBasePrices(true);
      getJson<PopcornPrices>('pricing/popcorn-prices/public')
        .then((data) => {
          setBasePrices({
            caramel: data.caramel ?? DEFAULT_PRICES.caramel,
            respresso: data.respresso ?? DEFAULT_PRICES.respresso,
            butter: data.butter ?? DEFAULT_PRICES.butter,
            cheddar: data.cheddar ?? DEFAULT_PRICES.cheddar,
            kettle: data.kettle ?? DEFAULT_PRICES.kettle,
          });
        })
        .catch(() => {
          setBasePrices(DEFAULT_PRICES);
        })
        .finally(() => {
          setLoadingBasePrices(false);
        });
      setLoadingDiscount(false);
      return;
    }

    let isActive = true;
    setLoadingDiscount(true);
    setDiscountError('');

    getJson<DiscountResponse>(`pricing/discount-codes/code/${code}`)
      .then((data) => {
        if (!isActive) return;
        setDiscount(data);
      })
      .catch((error: Error) => {
        if (!isActive) return;
        setDiscountError(error.message);
      })
      .finally(() => {
        if (!isActive) return;
        setLoadingDiscount(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const step = steps[currentStep];
  const isLoadingPricing = loadingDiscount || loadingBasePrices;

  function updateQuantity(flavor: PopcornFlavor, value: string) {
    const parsed = Number(value);
    const safeValue = Number.isNaN(parsed) ? 0 : parsed;
    setFormData((prev) => ({
      ...prev,
      popcornQuantities: {
        ...prev.popcornQuantities,
        [flavor]: safeValue,
      },
    }));
  }

  function validateStep() {
    setFormError('');

    if (isLoadingPricing) {
      setFormError('Loading pricing...');
      return false;
    }

    if (discountError) {
      setFormError(discountError);
      return false;
    }

    if (step.type === 'contact') {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setFormError('First and last name are required.');
        return false;
      }
      return true;
    }

    if (step.type === 'shipping') {
      if (!formData.phoneNumber.trim()) {
        setFormError('Phone number is required.');
        return false;
      }
      if (!formData.email.trim()) {
        setFormError('Email is required.');
        return false;
      }
      if (!formData.shippingAddress1.trim()) {
        setFormError('Street address is required.');
        return false;
      }
      if (!formData.shippingCity.trim()) {
        setFormError('City is required.');
        return false;
      }
      if (!formData.shippingState.trim()) {
        setFormError('State is required.');
        return false;
      }
      if (!formData.shippingPostalCode.trim()) {
        setFormError('Postal code is required.');
        return false;
      }
      return true;
    }

    if (step.type === 'flavor' && step.flavor) {
      const value = formData.popcornQuantities[step.flavor.key];
      if (value < 0) {
        setFormError('Quantity must be 0 or more.');
        return false;
      }
      return true;
    }

    return true;
  }

  async function handleNext() {
    if (!validateStep()) {
      return;
    }

    if (step.type === 'summary') {
      await handleSubmit();
      return;
    }

    setFormError('');
    setFormSuccess('');
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }

  function handlePrev() {
    setFormError('');
    setFormSuccess('');
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  async function handleSubmit() {
    setFormError('');
    setFormSuccess('');
    setIsSubmitting(true);

    const payload: OrderPayload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      company: formData.company.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim(),
      shippingAddress1: formData.shippingAddress1.trim(),
      shippingAddress2: formData.shippingAddress2.trim(),
      shippingCity: formData.shippingCity.trim(),
      shippingState: formData.shippingState.trim(),
      shippingPostalCode: formData.shippingPostalCode.trim(),
      discountCode,
      popcornQuantities: formData.popcornQuantities,
    };

    try {
      await postJson<{ orderId: string }>('orders/public', payload);
      setFormSuccess('Order submitted. We will follow up shortly.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Submission failed.';
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderStep() {
    if (step.type === 'contact') {
      return (
        <div className="step">
          <h1>Who is placing the order?</h1>
          <p className="subtitle">Tell us who to contact at your company.</p>
          <div className="field-group">
            <label>
              First name
              <input
                type="text"
                value={formData.firstName}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, firstName: event.target.value }))
                }
                placeholder="First"
              />
            </label>
            <label>
              Last name
              <input
                type="text"
                value={formData.lastName}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, lastName: event.target.value }))
                }
                placeholder="Last"
              />
            </label>
            <label>
              Company
              <input
                type="text"
                value={formData.company}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, company: event.target.value }))
                }
                placeholder="Company name"
              />
            </label>
          </div>
        </div>
      );
    }

    if (step.type === 'shipping') {
      return (
        <div className="step">
          <h1>Where should we send it?</h1>
          <p className="subtitle">We will confirm the order by email.</p>
          <div className="field-group">
            <label>
              Phone number
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, phoneNumber: event.target.value }))
                }
                placeholder="+1 (___) ___-____"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="you@email.com"
              />
            </label>
            <label>
              Street address
              <textarea
                value={formData.shippingAddress1}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, shippingAddress1: event.target.value }))
                }
                placeholder="Street address"
                rows={2}
              />
            </label>
            <label>
              Address line 2
              <input
                type="text"
                value={formData.shippingAddress2}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, shippingAddress2: event.target.value }))
                }
                placeholder="Suite, unit, etc (optional)"
              />
            </label>
            <label>
              City
              <input
                type="text"
                value={formData.shippingCity}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, shippingCity: event.target.value }))
                }
                placeholder="City"
              />
            </label>
            <label>
              State
              <select
                value={formData.shippingState}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, shippingState: event.target.value }))
                }
              >
                <option value="">Select a state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </label>
            <label>
              Postal code
              <input
                type="text"
                value={formData.shippingPostalCode}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, shippingPostalCode: event.target.value }))
                }
                placeholder="ZIP"
              />
            </label>
          </div>
        </div>
      );
    }

    if (step.type === 'flavor' && step.flavor) {
      const quantity = formData.popcornQuantities[step.flavor.key];
      const price = prices[step.flavor.key] || 0;
      return (
        <div className="step">
          <h1>
            How many cases of {step.flavor.label} {step.flavor.size} would you like
            to order?
          </h1>
          <p className="subtitle">Enter case count. Each case has 40 bags.</p>
          <div className="field-group">
            <label>
              Cases
              <input
                type="number"
                min={0}
                value={quantity}
                onChange={(event) => updateQuantity(step.flavor.key, event.target.value)}
              />
            </label>
          </div>
          <div className="callout">Price per case: {formatCurrency(price)}</div>
        </div>
      );
    }

    return (
      <div className="step">
        <h1>Order total</h1>
        <p className="subtitle">Review the total for your order.</p>
        <div className="summary">
          {flavors.map((flavor) => (
            <div className="summary__row" key={flavor.key}>
              <span>
                {flavor.label} ({formData.popcornQuantities[flavor.key]} cases)
              </span>
              <span>
                {formatCurrency(
                  formData.popcornQuantities[flavor.key] * (prices[flavor.key] || 0),
                )}
              </span>
            </div>
          ))}
          <div className="summary__total">
            <span>You will be charged</span>
            <strong>{formatCurrency(totalCost)}</strong>
          </div>
        </div>
        {discount?.requiresEmail ? (
          <div className="callout warning">
            This discount is locked to the email on file.
          </div>
        ) : null}
      </div>
    );
  }

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <main className="page">
      <section className="card">
        <header className="card__header">
          <div className="brand">
            <span className="brand__dot" />
            <span>Popcorn for the People</span>
          </div>
          <div className="progress">
            <div className="progress__bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="meta">
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span>
              {discountCode ? `Code: ${discountCode}` : 'No code detected'}
            </span>
          </div>
        </header>

        <div className="card__body">
          {isLoadingPricing ? (
            <div className="loading">Loading pricing...</div>
          ) : (
            renderStep()
          )}

          {discountError ? (
            <div className="error" role="alert">
              {discountError}
            </div>
          ) : null}
          {formError ? (
            <div className="error" role="alert">
              {formError}
            </div>
          ) : null}
          {formSuccess ? <div className="success">{formSuccess}</div> : null}
        </div>

        <footer className="card__footer">
          <button
            className="btn btn--ghost"
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0 || isSubmitting}
          >
            Previous
          </button>
          <button
            className="btn btn--primary"
            type="button"
            onClick={handleNext}
            disabled={isSubmitting || Boolean(discountError) || isLoadingPricing}
          >
            {step.type === 'summary' ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
          </button>
        </footer>
      </section>

      <footer className="page__footer">
        <span>API: {API_PREFIX}</span>
      </footer>
    </main>
  );
}

export default App;
