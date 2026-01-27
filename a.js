const ACCESS_TOKEN = process.env.TYPEFORM_TOKEN;
const FORM_ID = "YOUR_FORM_ID_HERE";

async function addLogicJumpToExistingForm() {
  // 1. Get current form definition

  const getRes = await fetch(`https://api.typeform.com/forms/${FORM_ID}`, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });

  if (!getRes.ok) {
    console.error("Failed to retrieve form:", getRes.status, await getRes.text());
    return;
  }

  const form = await getRes.json();

  // Ensure we have a logic array
  const logic = Array.isArray(form.logic) ? [...form.logic] : [];

  // Find any existing logic block for this field
  const TRIGGER_REF = "ref_trigger_field";   // must match your field ref
  const DEST_REF = "ref_field_leads_to";     // ref of destination field

  let fieldLogic = logic.find((l) => l.type === "field" && l.ref === TRIGGER_REF);

  if (!fieldLogic) {
    fieldLogic = {
      type: "field",
      ref: TRIGGER_REF,
      actions: [],
    };
    logic.push(fieldLogic);
  }

  fieldLogic.actions.push({
    action: "jump",
    details: {
      to: {
        type: "field",
        value: DEST_REF,
      },
    },
    condition: {
      op: "always",
      vars: [],
    },
  });

  // 2. PATCH form with updated logic
  const patchBody = { logic };

  const patchRes = await fetch(`https://api.typeform.com/forms/${FORM_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patchBody),
  });

  if (!patchRes.ok) {
    console.error("Failed to update form:", patchRes.status, await patchRes.text());
    return;
  }

  const updated = await patchRes.json();
  console.log("Updated logic for form:", updated.id);
}

addLogicJumpToExistingForm().catch(console.error);
