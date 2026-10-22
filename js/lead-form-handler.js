/**
 * Nakshatra Clinic - Shared Lead Form Handler
 * Submits lead forms to Celiyo HMS. Extracted from the inline handler
 * previously duplicated on index/contact/about-us/appointment-page/services.
 * Behavior is intentionally identical to that inline script, with the
 * contact-page variant's gtag condition merged in (appointmentForm OR contactForm).
 *
 * Tracking update (Digitech, Oct 2026):
 *  - Hard-coded gtag/fbq calls removed. Tracking now goes through Google Tag
 *    Manager (GTM-WBZ7VJCT) via dataLayer events:
 *      generate_lead  -> fired only when Celiyo confirms success (response.ok)
 *      form_error     -> fired when Celiyo returns an error or the network fails
 *  - No personal or health data is ever pushed to the dataLayer.
 *  - Optional: sends visit source fields (src_utm_*, src_gclid, src_landing_page,
 *    src_referrer) to Celiyo when window.NK_TRACKING_CONFIG.sendSourceFields
 *    is true (set in js/nk-attribution.js after Celiyo confirms the fields).
 */
(function () {
  const API_ENDPOINT = "https://hms.celiyo.com/api/nakshatra/submit/";

  function pushEvent(obj) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(obj);
  }

  function formId(form) {
    if (form.id) return form.id;
    if (form.classList && form.classList.contains("nks-form")) return "locationForm";
    return "unnamedForm";
  }

  function isLeadForm(form) {
    // Skip non-lead forms (e.g. blog search forms): GET forms and .search-form
    if (form.classList && form.classList.contains("search-form")) return false;
    if ((form.method || "").toLowerCase() === "get") return false;
    return true;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;

    // Prevent double submission
    if (form.dataset.submitting === "true") {
      return;
    }
    form.dataset.submitting = "true";

    if (form.checkValidity && !form.checkValidity()) {
      form.reportValidity();
      form.dataset.submitting = "false";
      return;
    }

    const submitButton = form.querySelector(
      'button[type="submit"], input[type="submit"], button:not([type]), #realSubmitBtn'
    );
    if (submitButton) {
      submitButton.disabled = true;
      if (submitButton.innerText.trim().length > 0) {
        submitButton.setAttribute(
          "data-original-text",
          submitButton.innerText
        );
        submitButton.innerText = "Sending...";
      }
    }

    // Send each mapped value under BOTH normalized and legacy keys so the
    // backend can read whichever it expects
    // (first_name/fname/firstname, last_name/lname/lastname,
    //  services/service, appointment_date/date).
    const ALIASES = {
      first_name: ["first_name", "fname", "firstname"],
      last_name: ["last_name", "lname", "lastname"],
      services: ["services", "service"],
      appointment_date: ["appointment_date", "date"],
    };
    const CANONICAL = { appointmentDate: "appointment_date" };
    Object.keys(ALIASES).forEach(function (canon) {
      ALIASES[canon].forEach(function (k) {
        CANONICAL[k] = canon;
      });
    });

    const rawData = new FormData(form);
    const formData = new FormData();
    const appended = {};
    rawData.forEach(function (value, key) {
      const canon = CANONICAL[key];
      if (canon) {
        if (appended[canon]) return; // avoid duplicates if form has two variants
        appended[canon] = true;
        ALIASES[canon].forEach(function (k) {
          formData.append(k, value);
        });
      } else {
        formData.append(key, value); // email, phone, message, etc. unchanged
      }
    });
    const clientEventId = crypto.randomUUID();
    formData.append("client_event_id", clientEventId);

    // Visit source for the CRM (only when enabled after Celiyo confirms the fields)
    const cfg = window.NK_TRACKING_CONFIG || {};
    if (cfg.sendSourceFields === true && window.nkAttribution) {
      const src = window.nkAttribution.formFields();
      Object.keys(src).forEach(function (k) {
        formData.append(k, src[k]);
      });
    }

    const trackBase = {
      form_id: formId(form),
      form_location: window.location.pathname,
      lead_ref: clientEventId, // random ID, also stored in Celiyo: links GA4/Ads to the CRM record without personal data
    };

    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "X-TENANT-ID": "d2bcd1ee-e5c5-4c9f-bff2-aaf901d40440",
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Confirmed lead: GTM sends it to GA4 (generate_lead), Google Ads and Meta (if enabled)
          pushEvent(Object.assign({ event: "generate_lead", lead_type: "form" }, trackBase));

          // Reset form after successful submission
          setTimeout(() => {
            form.reset();
            form.dataset.submitting = "false";
          }, 100);

          showMessage(form, "Message Sent Successfully!", "success");
        } else {
          pushEvent(Object.assign({ event: "form_error", error_type: "http_" + response.status }, trackBase));
          form.dataset.submitting = "false";
          showMessage(form, "Submission failed. Please retry.", "error");
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        pushEvent(Object.assign({ event: "form_error", error_type: "network" }, trackBase));
        form.dataset.submitting = "false";
        showMessage(
          form,
          "Error submitting form. Please try again later.",
          "error"
        );
      })
      .finally(() => {
        if (submitButton) {
          submitButton.disabled = false;
          if (submitButton.getAttribute("data-original-text")) {
            submitButton.innerText =
              submitButton.getAttribute("data-original-text");
          }
        }
      });
  }

  function showMessage(form, message, type) {
    let msgContainer = form.querySelector("#msgSubmit");
    if (!msgContainer) {
      msgContainer = document.createElement("div");
      msgContainer.id = "msgSubmit";
      msgContainer.className = "h3 hidden";
      form.appendChild(msgContainer);
    }
    msgContainer.innerText = message;
    msgContainer.classList.remove("hidden", "d-none");
    msgContainer.style.display = "block";
    msgContainer.classList.remove("text-success", "text-danger");
    if (type === "success") {
      msgContainer.classList.add("text-success");
    } else {
      msgContainer.classList.add("text-danger");
    }
  }

  function init() {
    if (window.nakshatraFormHandlerInitialized) {
      console.log("Form handler already initialized, skipping...");
      return;
    }
    window.nakshatraFormHandlerInitialized = true;

    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      if (!isLeadForm(form)) {
        return;
      }
      if (!form.dataset.handlerAttached) {
        form.addEventListener("submit", handleFormSubmit);
        form.dataset.handlerAttached = "true";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
