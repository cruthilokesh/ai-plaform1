const notifications = [

    {
        id: 1,
        title: "Student Scholarship Opportunities",
        category: "Scholarships",
        department: "Education",
        year: "2026",
        publishedOn: "2026-10-20",
        description:
            "Explore educational scholarship opportunities for eligible students. Check the original department notification for eligibility and application details.",
        date: "Demo entry",
        source: "Sample government information"
    },

    {
        id: 2,
        title: "Government Recruitment Updates",
        category: "Jobs",
        department: "Recruitment",
        year: "2026",
        publishedOn: "2026-10-15",
        description:
            "Find information about government recruitment, application procedures and eligibility requirements.",
        date: "Demo entry",
        source: "Sample government information"
    },

    {
        id: 3,
        title: "Public Welfare Schemes",
        category: "Schemes",
        department: "Social Welfare",
        year: "2025",
        publishedOn: "2025-12-10",
        description:
            "Discover public welfare initiatives and understand the benefits and eligibility conditions.",
        date: "Demo entry",
        source: "Sample government information"
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
        date: "Demo entry",
        source: "Sample government information"
    },

    {
        id: 5,
        title: "Higher Education Assistance",
        category: "Scholarships",
        department: "Education",
        year: "2025",
        publishedOn: "2025-11-18",
        description:
            "Learn about financial assistance opportunities for students pursuing higher education.",
        date: "Demo entry",
        source: "Sample government information"
    },

    {
        id: 6,
        title: "Employment and Career Opportunities",
        category: "Jobs",
        department: "Recruitment",
        year: "2026",
        publishedOn: "2026-10-05",
        description:
            "Explore public sector employment information and recruitment-related announcements.",
        date: "Demo entry",
        source: "Sample government information"
    }

];


/* =====================================
   2. DISPLAY NOTIFICATION CARDS
===================================== */

const notificationGrid =
    document.getElementById("notificationGrid");

const emptyMessage =
    document.getElementById("emptyMessage");


function displayNotifications(data) {

    notificationGrid.innerHTML = "";

    if (data.length === 0) {

        emptyMessage.hidden = false;
        return;

    }

    emptyMessage.hidden = true;

    data.forEach(notification => {

        const card = document.createElement("article");

        card.className = "notification-card";

        card.innerHTML = `

            <div class="notification-meta">

                <span class="category-tag">
                    ${notification.category}
                </span>

                <span class="notification-date">
                    ${notification.date}
                </span>

            </div>

            <h3>${notification.title}</h3>

            <p>${notification.description}</p>

            <div class="notification-source">

                <i class="fa-solid fa-circle-info"></i>

                ${notification.source}

            </div>

            <div class="notification-footer">

                <button class="read-more"
                        data-id="${notification.id}">

                    View details
                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        `;

        notificationGrid.appendChild(card);

    });

}


// Display all notifications when the page loads.

displayNotifications(notifications);


/* =====================================
   3. CATEGORY FILTER
===================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");


function filterNotifications(category) {

    filterButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.filter === category
        );

    });

    if (category === "All") {

        displayNotifications(notifications);

    } else {

        const filtered = notifications.filter(item =>
            item.category === category
        );

        displayNotifications(filtered);

    }

}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterNotifications(button.dataset.filter);

    });

});


/* =====================================
   4. SEARCH FUNCTIONALITY
===================================== */

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");


function searchNotifications(query) {

    const searchTerm = query.trim().toLowerCase();

    const results = notifications.filter(item => {

        return (

            item.title.toLowerCase().includes(searchTerm) ||

            item.category.toLowerCase().includes(searchTerm) ||

            item.description.toLowerCase().includes(searchTerm)

        );

    });

    filterButtons.forEach(button =>
        button.classList.remove("active")
    );

    displayNotifications(results);

    document.getElementById("notifications")
        .scrollIntoView({ behavior: "smooth" });

}


searchForm.addEventListener("submit", event => {

    event.preventDefault();

    if (searchInput.value.trim() === "") {

        searchInput.focus();
        return;

    }

    searchNotifications(searchInput.value);

});


/* =====================================
   5. POPULAR SEARCH SUGGESTIONS
===================================== */

document.querySelectorAll(".search-suggestion")
    .forEach(button => {

        button.addEventListener("click", () => {

            const query = button.dataset.query;

            searchInput.value = query;

            searchNotifications(query);

        });

    });


/* =====================================
   6. CATEGORY CARDS
===================================== */

document.querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const category = card.dataset.category;

            filterNotifications(category);

            document.getElementById("notifications")
                .scrollIntoView({ behavior: "smooth" });

        });

    });


/* =====================================
   7. VIEW ALL BUTTON
===================================== */

document.getElementById("viewAllBtn")
    .addEventListener("click", () => {

        filterNotifications("All");

        document.getElementById("notifications")
            .scrollIntoView({ behavior: "smooth" });

    });


/* =====================================
   8. NOTIFICATION DETAILS
===================================== */

notificationGrid.addEventListener("click", event => {

    const button = event.target.closest(".read-more");

    if (!button) return;

    const id = Number(button.dataset.id);

    const notification = notifications.find(
        item => item.id === id
    );

    if (!notification) return;

    alert(

        "DEMO NOTIFICATION\n\n" +

        notification.title + "\n\n" +

        notification.description + "\n\n" +

        "Source: " + notification.source + "\n\n" +

        "This is sample data. Original government document links " +
        "will be provided after backend integration."

    );

});


/* =====================================
   9. AI CHAT INTERFACE
===================================== */

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");

const chatMessages =
    document.getElementById("chatMessages");


function addMessage(message, type) {

    const messageElement =
        document.createElement("div");

    messageElement.className = type;

    // textContent prevents user input from being treated as HTML.

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


function sendMessage(message) {

    const question = message.trim();

    if (!question) return;

    addMessage(question, "user-message");

    chatInput.value = "";

    // This is only a frontend demonstration.
    // The actual AI response will come from our Flask backend.

    setTimeout(() => {

        addMessage(

            "Thank you for your question! The AI response system " +
            "is currently a frontend demo. Once connected to the " +
            "backend, I will retrieve relevant government documents, " +
            "generate a simplified answer and provide source references.",

            "bot-message"

        );

    }, 600);

}


chatForm.addEventListener("submit", event => {

    event.preventDefault();

    sendMessage(chatInput.value);

});


/* =====================================
   10. SUGGESTED QUESTIONS
===================================== */

document.querySelectorAll(".suggested-questions button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const question = button.dataset.question;

            sendMessage(question);

        });

    });


/* =====================================
   11. MOBILE NAVIGATION
===================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.querySelector(".nav-links");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});

console.log("Karnataka AI frontend loaded successfully.");
/* =====================================
   PHASE 2: ADVANCED FILTERING
===================================== */

const advancedSearchForm =
    document.getElementById("advancedSearchForm");

const advancedCategory =
    document.getElementById("advancedCategory");

const departmentFilter =
    document.getElementById("departmentFilter");

const yearFilter =
    document.getElementById("yearFilter");

const sortFilter =
    document.getElementById("sortFilter");

const resetAdvancedSearch =
    document.getElementById("resetAdvancedSearch");


advancedSearchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Read selected filter values.

    const category = advancedCategory.value;
    const department = departmentFilter.value;
    const year = yearFilter.value;
    const sort = sortFilter.value;

    // Start with all available records.

    let results = [...notifications];

    // Filter by category.

    if (category !== "All") {

        results = results.filter(item =>
            item.category === category
        );

    }

    // Filter by department.

    if (department !== "All") {

        results = results.filter(item =>
            item.department === department
        );

    }

    // Filter by publication year.

    if (year !== "All") {

        results = results.filter(item =>
            item.year === year
        );

    }

    // Sort the matching results.

    if (sort === "newest") {

        results.sort((a, b) =>
            new Date(b.publishedOn) -
            new Date(a.publishedOn)
        );

    }

    else if (sort === "oldest") {

        results.sort((a, b) =>
            new Date(a.publishedOn) -
            new Date(b.publishedOn)
        );

    }

    else if (sort === "az") {

        results.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

    }

    // Remove active category button selection.

    filterButtons.forEach(button =>
        button.classList.remove("active")
    );

    // Display filtered records.

    displayNotifications(results);

    // Scroll to the results.

    document.getElementById("notifications")
        .scrollIntoView({ behavior: "smooth" });

});


/* =====================================
   RESET ADVANCED FILTERS
===================================== */

resetAdvancedSearch.addEventListener("click", function() {

    advancedSearchForm.reset();

    searchInput.value = "";

    filterNotifications("All");

});