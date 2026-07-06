/**
 * Nakshatra Clinic - Shared Lead Form Handler
 * Submits lead forms to Celiyo HMS. Extracted from the inline handler
 * previously duplicated on index/contact/about-us/appointment-page/services.
 * Behavior is intentionally identical to that inline script, with the
 * contact-page variant's gtag condition merged in (appointmentForm OR contactForm).
 */
(function () {
  const API_ENDPOINT = "https://hms.celiyo.com/api/nakshatra/submit/";

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

    // Normalize field names to match the backend table
    // (first_name, last_name, email, phone, services, appointment_date)
    const FIELD_MAP = {
      firstname: "first_name",
      fname: "first_name",
      first_name: "first_name",
      lastname: "last_name",
      lname: "last_name",
      last_name: "last_name",
      service: "services",
      services: "services",
      date: "appointment_date",
      appointmentDate: "appointment_date",
      appointment_date: "appointment_date",
    };
    const rawData = new FormData(form);
    const formData = new FormData();
    rawData.forEach(function (value, key) {
      formData.append(FIELD_MAP[key] || key, value);
    });
    formData.append("client_event_id", crypto.randomUUID());

    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "X-TENANT-ID": "d2bcd1ee-e5c5-4c9f-bff2-aaf901d40440",
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Track Facebook Pixel
          if (typeof window.fbq === "function") {
            window.fbq("track", "Lead");
          }

          const isAppointmentForm =
            form.id === "appointmentForm" || form.id === "contactForm";

          if (isAppointmentForm) {
            // Direct conversion via gtag
            if (typeof window.gtag === "function") {
              window.gtag("event", "conversion", {
                send_to: "AW-338713549/69GcCKrHo9gbEM23waEB",
                event_callback: function () {
                  console.log("Direct conversion tracked successfully");
                },
              });
            }
          }

          // Reset form after successful submission
          setTimeout(() => {
            form.reset();
            form.dataset.submitting = "false";
          }, 100);

          showMessage(form, "Message Sent Successfully!", "success");
        } else {
          form.dataset.submitting = "false";
          showMessage(form, "Submission failed. Please retry.", "error");
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
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
