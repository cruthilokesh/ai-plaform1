/* =====================================
   1. DOCUMENT DATA
===================================== */

// Temporary frontend data.
// Later, Flask will provide this information.

const documentRecords = [

    {
        id: 1,
        title: "Student Scholarship Opportunities",
        category: "Scholarships",
        department: "Education",
        year: "2026–27",
        publishedOn: "2026-10-20",
        description:
            "Explore educational scholarship opportunities for eligible students.",
        summary:
            "This is a sample summary for demonstrating the document explorer. Actual scholarship details will be generated from the original government notification using the backend RAG system.",
        eligibility: [
            "Eligibility information has not yet been verified.",
            "Refer to the original government notification for requirements."
        ],
        dates: [
            { label: "Publication date", value: "20 October 2026" },
            { label: "Application deadline", value: "Not available" }
        ],
        reference: "Not provided",
        sourceUrl: null,
        pdfUrl: null
    },

    {
        id: 2,
        title: "Government Recruitment Updates",
        category: "Jobs",
        department: "Recruitment",
        year: "2026",
        publishedOn: "2026-10-15",
        description:
            "Find information about government recruitment and job announcements.",
        summary:
            "This sample explanation demonstrates how recruitment information will be presented in simple language after processing the original government document.",
        eligibility: [
            "Recruitment eligibility is not verified in this demo.",
            "Check the original recruitment notification."
        ],
        dates: [
            { label: "Publication date", value: "15 October 2026" },
            { label: "Application deadline", value: "Not available" }
        ],
        reference: "Not provided",
        sourceUrl: null,
        pdfUrl: null
    },

    {
        id: 3,
        title: "Public Welfare Schemes",
        category: "Schemes",
        department: "Social Welfare",
        year: "2025",
        publishedOn: "2025-12-10",
        description:
            "Discover public welfare initiatives and government benefits.",
        summary:
            "This is an illustrative explanation of how a government scheme will be summarized for users.",
        eligibility: [
            "Scheme eligibility has not been verified.",
            "Refer to the original department notification."
        ],
        dates: [
            { label: "Publication date", value: "10 December 2025" }
        ],
        reference: "Not provided",
        sourceUrl: null,
        pdfUrl: null
    },

    {
        id: 4,
        title: "Important Government Announcements",
        category: "Notifications",
        department: "General Administration",
        year: "2026",
        publishedOn: "2026-10-25",
        description:
            "Access important announcements and updates from government departments.",
        summary:
            "This sample summary demonstrates the notification explanation interface.",
        eligibility: [
            "No specific eligibility information is available in this demo."
        ],
        dates: [
            { label: "Publication date", value: "25 October 2026" }
        ],
        reference: "Not provided",
        sourceUrl: null,
        pdfUrl: null
    },

    {
        id: 5,
        title: "Higher Education Assistance",
        category: "Scholarships",
        department: "Education",
        year: "2025",
        publishedOn: "2025-11-18",
        description:
            "Learn about financial assistance opportunities for higher education.",
        summary:
            "This sample explanation shows how students will be able to understand lengthy scholarship documents more easily.",
        eligibility: [
            "Eligibility is not verified in this demo.",
            "Refer to the original government document."
        ],
        dates: [
            { label: "Publication date", value: "18 November 2025" }
        ],
        reference: "Not provided",
        sourceUrl: null,
        pdfUrl: null
    },

    {
        id: 6,
        title: "Employment and Career Opportunities",
        category: "Jobs",
        department: "Recruitment",
        year: "2026",
        publishedOn: "2026-10-05",
        description:
            "Explore public sector employment information and recruitment announcements.",
        summary:
            "This sample explanation demonstrates how employment information can be organized and presented.",
        eligibility: [
            "No verified eligibility information is available."
        ],
        dates: [
            { label: "Publication date", value: "5 October 2026" }
        ],
        reference: "Not provided",
        sourceUrl: null,
        pdfUrl: null
    }

];


/* =====================================
   2. GET DOCUMENT ID FROM URL
===================================== */

const parameters = new URLSearchParams(
    window.location.search
);

const documentId = Number(parameters.get("id"));

const documentData = documentRecords.find(
    item => item.id === documentId
);


/* =====================================
   3. HELPER FUNCTIONS
===================================== */

// Safely display text inside an HTML element.

function setText(elementId, value) {

    const element = document.getElementById(elementId);

    if (!element) {
        console.warn(`Element not found: ${elementId}`);
        return;
    }

    element.textContent = value || "Not available";
}


// Create HTML elements using JavaScript.

function createElement(tag, className, text) {

    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}


// Accept only HTTP or HTTPS links.
// This prevents unsafe links such as javascript: URLs.

function getSafeHttpUrl(value) {

    if (!value) {
        return null;
    }

    try {

        const url = new URL(value);

        if (
            url.protocol === "https:" ||
            url.protocol === "http:"
        ) {
            return url;
        }

        return null;

    } catch (error) {

        return null;
    }
}


// Format a date for display.

function formatDate(value) {

    if (!value) {
        return "Not available";
    }

    const date = new Date(value + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* =====================================
   4. DISPLAY DOCUMENT DETAILS
===================================== */

function displayDocument(data) {

    // Main document information.

    setText("documentTitle", data.title);
    setText("documentCategory", data.category);
    setText("documentDescription", data.description);
    setText("documentDepartment", data.department);
    setText("documentDate", data.publishedOn);
    setText("documentYear", data.year);
    setText("documentType", data.category);

    // Sidebar information.

    setText("sidebarCategory", data.category);
    setText("sidebarDepartment", data.department);
    setText("sidebarDate", data.publishedOn);
    setText("sidebarYear", data.year);

    // AI summary.

    const summary = document.getElementById("aiSummary");

    summary.replaceChildren(
        createElement("p", "", data.summary)
    );

    // Eligibility information.

    const eligibility =
        document.getElementById("eligibilityContent");

    const eligibilityList =
        createElement("ul", "detail-list");

    data.eligibility.forEach(item => {

        const li = createElement("li");

        const icon = createElement("i");
        icon.className = "fa-solid fa-circle-info";

        const text = createElement("span", "", item);

        li.append(icon, text);

        eligibilityList.appendChild(li);
    });

    eligibility.replaceChildren(eligibilityList);

    // Important dates.

    const datesContent =
        document.getElementById("datesContent");

    datesContent.replaceChildren();

    data.dates.forEach(item => {

        const row = createElement("div", "source-details");

        const label = createElement("span", "", item.label);

        const value = createElement("strong", "", item.value);

        row.append(label, value);

        datesContent.appendChild(row);
    });

    // Source verification.

    configureSource(data);
}


/* =====================================
   5. SOURCE VERIFICATION
===================================== */

function configureSource(data) {

    const verificationStatus =
        document.getElementById("verificationStatus");

    const verificationTitle =
        document.getElementById("verificationTitle");

    const verificationDescription =
        document.getElementById("verificationDescription");

    const sourceButton =
        document.getElementById("originalSourceBtn");

    const pdfButton =
        document.getElementById("pdfDownloadBtn");

    const status =
        document.getElementById("sourceStatus");

    const preview =
        document.getElementById("pdfPreview");


    // Display source metadata.

    setText("sourceDepartment", data.department);

    setText("sourceReference", data.reference);

    setText("sourceDate", formatDate(data.publishedOn));


    // Check whether a usable HTTP/HTTPS source URL exists.

    const safeSourceUrl = getSafeHttpUrl(data.sourceUrl);

    if (safeSourceUrl) {

        setText("sourceDomain", safeSourceUrl.hostname);

        sourceButton.href = safeSourceUrl.href;

        sourceButton.hidden = false;

        verificationStatus.classList.remove(
            "verified",
            "unverified"
        );

        verificationStatus.classList.add("unverified");

        verificationTitle.textContent =
            "Source link available — verification pending";

        verificationDescription.textContent =
            "A source link has been provided, but its authenticity has not yet been independently verified.";

        status.textContent =
            "Source link available. Please check the issuing department and original document.";

    } else {

        setText("sourceDomain", "Not connected");

        sourceButton.hidden = true;

        verificationStatus.classList.remove(
            "verified",
            "unverified"
        );

        verificationTitle.textContent =
            "Verification unavailable";

        verificationDescription.textContent =
            "This document has not yet been connected to a verified official government source.";

        status.textContent =
            "No original government source link is connected to this demo record.";
    }


    // Handle PDF preview and PDF button.

    const safePdfUrl = getSafeHttpUrl(data.pdfUrl);

    if (safePdfUrl) {

        pdfButton.href = safePdfUrl.href;

        pdfButton.hidden = false;

        preview.replaceChildren();

        const iframe = document.createElement("iframe");

        iframe.src = safePdfUrl.href;

        iframe.title = "Original government document PDF";

        iframe.width = "100%";
        iframe.height = "600";

        iframe.loading = "lazy";

        preview.appendChild(iframe);

    } else {

        pdfButton.hidden = true;
    }

    // Important:
    // A URL does not automatically mean a document is verified.
    // Actual verification must be implemented by the backend.
}


/* =====================================
   6. DOCUMENT NOT FOUND
===================================== */

function showNotFound() {

    const page = document.querySelector(".document-page");

    if (!page) {
        return;
    }

    page.replaceChildren();

    const message = createElement("div", "content-panel");

    const heading = createElement(
        "h2",
        "",
        "Document not found"
    );

    const paragraph = createElement(
        "p",
        "",
        "The requested document does not exist in our current demo data."
    );

    const link = createElement(
        "a",
        "source-button",
        "Return to homepage"
    );

    link.href = "index.html";

    message.append(heading, paragraph, link);

    page.appendChild(message);
}


/* =====================================
   7. COPY DOCUMENT LINK
===================================== */

const copyLinkButton =
    document.getElementById("copyLinkBtn");

if (copyLinkButton) {

    copyLinkButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            alert("Document link copied!");

        } catch (error) {

            alert(
                "Unable to copy the link. Please copy it from the address bar."
            );
        }
    });
}


/* =====================================
   8. PRINT DOCUMENT
===================================== */

const printButton =
    document.getElementById("printBtn");

if (printButton) {

    printButton.addEventListener("click", () => {

        window.print();

    });
}


/* =====================================
   9. INITIALIZE DOCUMENT PAGE
===================================== */

if (documentData) {

    displayDocument(documentData);

} else {

    showNotFound();

}

console.log("Document explorer initialized.");