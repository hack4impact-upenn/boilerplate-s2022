/**
 * Script to seed sample orders with status history dates
 * Run via the /orders/seed-sample endpoint or directly
 */
import { Order } from '../models/order.model.ts';

interface SampleOrder {
  name: string;
  email: string;
  company: string;
  statuses: Array<{
    status: string;
    daysAgo: number;
  }>;
  popcorn: {
    caramel: number;
    respresso: number;
    butter: number;
    cheddar: number;
    kettle: number;
  };
  amountPaid: number;
}

// Sample orders with different status progressions
const sampleOrders: SampleOrder[] = [
  {
    name: 'Lihini Perera',
    email: 'lihini@example.com',
    company: 'Tech Corp',
    statuses: [
      { status: 'Inquiry', daysAgo: 14 },
      { status: 'Confirmed', daysAgo: 12 },
      { status: 'In Production', daysAgo: 8 },
      { status: 'Ready to Ship', daysAgo: 3 },
      { status: 'Shipped', daysAgo: 1 },
    ],
    popcorn: { caramel: 50, respresso: 30, butter: 20, cheddar: 25, kettle: 15 },
    amountPaid: 450,
  },
  {
    name: 'Marcus Johnson',
    email: 'marcus@startup.io',
    company: 'Startup Inc',
    statuses: [
      { status: 'Inquiry', daysAgo: 10 },
      { status: 'Confirmed', daysAgo: 8 },
      { status: 'In Production', daysAgo: 5 },
    ],
    popcorn: { caramel: 100, respresso: 0, butter: 50, cheddar: 50, kettle: 0 },
    amountPaid: 600,
  },
  {
    name: 'Sarah Chen',
    email: 'sarah@bigco.com',
    company: 'Big Corporation',
    statuses: [
      { status: 'Inquiry', daysAgo: 7 },
      { status: 'Confirmed', daysAgo: 5 },
    ],
    popcorn: { caramel: 200, respresso: 100, butter: 100, cheddar: 100, kettle: 100 },
    amountPaid: 1500,
  },
  {
    name: 'David Kim',
    email: 'david@events.com',
    company: 'Events Plus',
    statuses: [
      { status: 'Inquiry', daysAgo: 21 },
      { status: 'Confirmed', daysAgo: 18 },
      { status: 'In Production', daysAgo: 14 },
      { status: 'Ready to Ship', daysAgo: 10 },
      { status: 'Shipped', daysAgo: 7 },
      { status: 'Invoiced', daysAgo: 5 },
    ],
    popcorn: { caramel: 75, respresso: 75, butter: 75, cheddar: 75, kettle: 75 },
    amountPaid: 1125,
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily@school.edu',
    company: 'Lincoln High School',
    statuses: [
      { status: 'Inquiry', daysAgo: 3 },
    ],
    popcorn: { caramel: 30, respresso: 0, butter: 30, cheddar: 20, kettle: 20 },
    amountPaid: 0,
  },
  {
    name: 'James Wilson',
    email: 'james@nonprofit.org',
    company: 'Community Foundation',
    statuses: [
      { status: 'Inquiry', daysAgo: 5 },
      { status: 'Confirmed', daysAgo: 3 },
      { status: 'In Production', daysAgo: 1 },
    ],
    popcorn: { caramel: 40, respresso: 40, butter: 40, cheddar: 40, kettle: 40 },
    amountPaid: 500,
  },
  {
    name: 'Amanda Foster',
    email: 'amanda@wedding.com',
    company: 'Foster Wedding',
    statuses: [
      { status: 'Inquiry', daysAgo: 30 },
      { status: 'Confirmed', daysAgo: 25 },
      { status: 'In Production', daysAgo: 20 },
      { status: 'Ready to Ship', daysAgo: 15 },
      { status: 'Shipped', daysAgo: 12 },
      { status: 'Invoiced', daysAgo: 10 },
    ],
    popcorn: { caramel: 150, respresso: 50, butter: 100, cheddar: 0, kettle: 100 },
    amountPaid: 1200,
  },
  {
    name: 'Michael Brown',
    email: 'michael@office.com',
    company: 'Brown & Associates',
    statuses: [
      { status: 'Inquiry', daysAgo: 2 },
      { status: 'Confirmed', daysAgo: 1 },
    ],
    popcorn: { caramel: 25, respresso: 25, butter: 25, cheddar: 25, kettle: 0 },
    amountPaid: 300,
  },
];

/**
 * Helper to get date X days ago
 */
function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  // Randomize the hour a bit for more realistic data
  date.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60), 0, 0);
  return date;
}

/**
 * Generate a unique ID for the order
 */
function generateUuid(): string {
  return `sample-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Seed sample orders into the database
 */
export async function seedSampleOrders(): Promise<{
  created: number;
  skipped: number;
  orders: string[];
}> {
  const results = {
    created: 0,
    skipped: 0,
    orders: [] as string[],
  };

  for (const sample of sampleOrders) {
    // Check if order with this email already exists
    const existing = await Order.findOne({ email: sample.email });
    if (existing) {
      console.log(`⏭️  Skipping ${sample.name} - already exists`);
      results.skipped++;
      continue;
    }

    const uuid = generateUuid();
    const lastStatus = sample.statuses[sample.statuses.length - 1];
    const inquiryDate = daysAgo(sample.statuses[0].daysAgo);

    // Build statusDates from the status progression
    const statusDates: Record<string, Date | null> = {
      inquiry: null,
      confirmed: null,
      inProduction: null,
      readyToShip: null,
      shipped: null,
      invoiced: null,
    };

    const statusKeyMap: Record<string, string> = {
      'Inquiry': 'inquiry',
      'Confirmed': 'confirmed',
      'In Production': 'inProduction',
      'Ready to Ship': 'readyToShip',
      'Shipped': 'shipped',
      'Invoiced': 'invoiced',
    };

    sample.statuses.forEach(({ status, daysAgo: days }) => {
      const key = statusKeyMap[status];
      if (key) {
        statusDates[key] = daysAgo(days);
      }
    });

    const orderData = {
      orderId: uuid,
      uuid,
      email: sample.email,
      firstName: sample.name.split(' ')[0],
      lastName: sample.name.split(' ').slice(1).join(' ') || '',
      name: sample.name,
      phoneNumber: `555-${Math.floor(1000 + Math.random() * 9000)}`,
      company: sample.company,
      discountCode: '',
      discountPrice: 0,
      amountPaid: sample.amountPaid,
      status: lastStatus.status,
      statusDates,
      popcornQuantities: sample.popcorn,
      submittedAt: inquiryDate,
    };

    try {
      const order = new Order(orderData);
      await order.save();
      console.log(`✅ Created order for ${sample.name} (${lastStatus.status})`);
      results.created++;
      results.orders.push(`${sample.name} - ${lastStatus.status}`);
    } catch (error: any) {
      console.error(`❌ Failed to create order for ${sample.name}:`, error.message);
    }
  }

  console.log(`\n📊 Seed complete: ${results.created} created, ${results.skipped} skipped`);
  return results;
}

/**
 * Delete all sample orders (those with uuid starting with 'sample-')
 */
export async function deleteSampleOrders(): Promise<number> {
  const result = await Order.deleteMany({ uuid: { $regex: /^sample-/ } });
  console.log(`🗑️  Deleted ${result.deletedCount} sample orders`);
  return result.deletedCount;
}

export default seedSampleOrders;

