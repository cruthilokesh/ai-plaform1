/* =====================================
   KARNATAKA AI - ASSISTANT LOGIC
===================================== */


/* 1. GET HTML ELEMENTS */

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const welcomeScreen = document.getElementById("welcomeScreen");

const newChatBtn = document.getElementById("newChatBtn");
const clearChatBtn = document.getElementById("clearChatBtn");

const chatHistory = document.getElementById("chatHistory");
const languageSelect = document.getElementById("languageSelect");

const sendBtn = document.getElementById("sendBtn");

const mobileSidebarBtn = document.getElementById("mobileSidebarBtn");
const chatSidebar = document.getElementById("chatSidebar");


/* 2. STORE CONVERSATION DATA */

let conversations = [];
let currentConversation = [];

let currentLanguage = "en";
let conversationNumber = 1;


/* 3. DEMO RESPONSE DATABASE */

const demoResponses = [

    {
        keywords: ["scholarship", "student", "education"],

        en: `
            <p>I can help you explore student scholarship information.</p>

            <p><strong>When reviewing a scholarship notice, check:</strong></p>

            <ul>
                <li>Educational qualification</li>
                <li>Family income criteria</li>
                <li>Eligible courses</li>
                <li>Application start and closing dates</li>
                <li>Required documents</li>
            </ul>

            <p>Search the official Karnataka government portal for the latest verified scholarship notification.</p>
        `,

        kn: `
            <p>ವಿದ್ಯಾರ್ಥಿವೇತನ ಮಾಹಿತಿಯನ್ನು ಹುಡುಕಲು ನಾನು ಸಹಾಯ ಮಾಡಬಹುದು.</p>

            <p><strong>ವಿದ್ಯಾರ್ಥಿವೇತನ ಅಧಿಸೂಚನೆಯಲ್ಲಿ ಪರಿಶೀಲಿಸಬೇಕಾದ ಅಂಶಗಳು:</strong></p>

            <ul>
                <li>ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆ</li>
                <li>ಕುಟುಂಬದ ಆದಾಯದ ಮಾನದಂಡ</li>
                <li>ಅರ್ಹ ಕೋರ್ಸ್‌ಗಳು</li>
                <li>ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಕೊನೆಯ ದಿನಾಂಕ</li>
                <li>ಅಗತ್ಯ ದಾಖಲೆಗಳು</li>
            </ul>

            <p>ಹೊಸ ಮಾಹಿತಿಗಾಗಿ ಅಧಿಕೃತ ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಪರಿಶೀಲಿಸಿ.</p>
        `
    },

    {
        keywords: ["job", "recruitment", "employment", "vacancy"],

        en: `
            <p>To explore Karnataka government recruitment notifications, check these details:</p>

            <ul>
                <li>Post name and department</li>
                <li>Educational qualification</li>
                <li>Age limit</li>
                <li>Application fee</li>
                <li>Selection procedure</li>
                <li>Application deadline</li>
            </ul>

            <p>Always refer to the original recruitment notification before applying.</p>
        `,

        kn: `
            <p>ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ನೇಮಕಾತಿ ಅಧಿಸೂಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸುವಾಗ ಈ ಅಂಶಗಳನ್ನು ಗಮನಿಸಿ:</p>

            <ul>
                <li>ಹುದ್ದೆಯ ಹೆಸರು ಮತ್ತು ಇಲಾಖೆ</li>
                <li>ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆ</li>
                <li>ವಯೋಮಿತಿ</li>
                <li>ಅರ್ಜಿ ಶುಲ್ಕ</li>
                <li>ಆಯ್ಕೆ ಪ್ರಕ್ರಿಯೆ</li>
                <li>ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಕೊನೆಯ ದಿನಾಂಕ</li>
            </ul>

            <p>ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ಮೂಲ ಅಧಿಸೂಚನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.</p>
        `
    },

    {
        keywords: ["scheme", "welfare", "benefit"],

        en: `
            <p>Government welfare schemes may provide support in areas such as:</p>

            <ul>
                <li>Education</li>
                <li>Healthcare</li>
                <li>Housing</li>
                <li>Employment</li>
                <li>Agriculture</li>
                <li>Financial assistance</li>
            </ul>

            <p>Eligibility and benefits differ between schemes. The original government guidelines should always be checked.</p>
        `,

        kn: `
            <p>ಸರ್ಕಾರದ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು ಈ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಸಹಾಯ ಒದಗಿಸಬಹುದು:</p>

            <ul>
                <li>ಶಿಕ್ಷಣ</li>
                <li>ಆರೋಗ್ಯ</li>
                <li>ವಸತಿ</li>
                <li>ಉದ್ಯೋಗ</li>
                <li>ಕೃಷಿ</li>
                <li>ಆರ್ಥಿಕ ನೆರವು</li>
            </ul>

            <p>ಪ್ರತಿಯೊಂದು ಯೋಜನೆಯ ಅರ್ಹತೆ ಮತ್ತು ಪ್ರಯೋಜನಗಳು ವಿಭಿನ್ನವಾಗಿರುತ್ತವೆ. ಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.</p>
        `
    },

    {
        keywords: ["verify", "genuine", "official", "authentic"],

        en: `
            <p>To verify whether a government notification is genuine:</p>

            <ul>
                <li>Check the official government department website.</li>
                <li>Look for the notification number and publication date.</li>
                <li>Compare the document with the original PDF.</li>
                <li>Check whether the application link belongs to an official domain.</li>
                <li>Do not rely only on forwarded messages or screenshots.</li>
            </ul>

            <p>Karnataka AI should provide links to original documents so users can independently verify information.</p>
        `,

        kn: `
            <p>ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆ ನಿಜವೇ ಎಂದು ಪರಿಶೀಲಿಸಲು:</p>

            <ul>
                <li>ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಇಲಾಖೆಯ ವೆಬ್‌ಸೈಟ್ ಪರಿಶೀಲಿಸಿ.</li>
                <li>ಅಧಿಸೂಚನೆ ಸಂಖ್ಯೆ ಮತ್ತು ಪ್ರಕಟಣೆಯ ದಿನಾಂಕ ಪರಿಶೀಲಿಸಿ.</li>
                <li>ಮೂಲ PDF ಜೊತೆಗೆ ಮಾಹಿತಿಯನ್ನು ಹೋಲಿಸಿ.</li>
                <li>ಅರ್ಜಿ ಲಿಂಕ್ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಸೇರಿದೆಯೇ ಎಂದು ನೋಡಿ.</li>
            </ul>

            <p>ಮಾಹಿತಿಯನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ಪರಿಶೀಲಿಸಲು ಮೂಲ ದಾಖಲೆಗಳ ಲಿಂಕ್‌ಗಳನ್ನು ಒದಗಿಸುವುದು ಮುಖ್ಯ.</p>
        `
    }

];


/* 4. FIND A SUITABLE DEMO RESPONSE */

function getDemoResponse(question) {

    const lowerQuestion = question.toLowerCase();

    const matchedResponse = demoResponses.find(response => {

        return response.keywords.some(keyword =>
            lowerQuestion.includes(keyword)
        );

    });

    if (matchedResponse) {
        return matchedResponse[currentLanguage];
    }

    if (currentLanguage === "kn") {

        return `
            <p>ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಧನ್ಯವಾದಗಳು.</p>

            <p>ಈ ವಿಷಯದ ಬಗ್ಗೆ ನಿಖರವಾದ ಮಾಹಿತಿಯನ್ನು ನೀಡಲು ಸಂಬಂಧಿತ ಸರ್ಕಾರಿ ಅಧಿಸೂಚನೆಯನ್ನು ಪರಿಶೀಲಿಸಬೇಕು.</p>

            <p>ಪ್ರಸ್ತುತ ಇದು ಡೆಮೊ ಆವೃತ್ತಿಯಾಗಿದ್ದು, ಅಧಿಕೃತ ದಾಖಲೆಗಳೊಂದಿಗೆ ಇನ್ನೂ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ.</p>
        `;

    }

    return `
        <p>Thank you for your question.</p>

        <p>To provide an accurate answer, the relevant government notification must be checked.</p>

        <p>This is currently a frontend demo and is not connected to official documents or the AI backend.</p>
    `;

}


/* 5. DISPLAY A MESSAGE */

function addMessage(type, content, isHTML = false) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    const messageContent = document.createElement("div");

    messageContent.className = "message-content";

    const label = document.createElement("span");

    label.className = "message-label";

    label.textContent =
        type === "user" ? "YOU" : "KARNATAKA AI";

    messageContent.appendChild(label);

    const body = document.createElement("div");

    if (isHTML) {
        body.innerHTML = content;
    } else {
        body.textContent = content;
    }

    messageContent.appendChild(body);

    message.appendChild(messageContent);

    if (type === "assistant") {

        const actions = document.createElement("div");

        actions.className = "message-actions";

        actions.innerHTML = `
            <button class="feedback-btn" data-feedback="helpful"
                    aria-label="Helpful">
                <i class="far fa-thumbs-up"></i>
            </button>

            <button class="feedback-btn" data-feedback="not-helpful"
                    aria-label="Not helpful">
                <i class="far fa-thumbs-down"></i>
            </button>
        `;

        messageContent.appendChild(actions);

        const warning = document.createElement("div");

        warning.className = "demo-warning";

        warning.textContent =
            "Demo response only. No official document has been retrieved or verified.";

        messageContent.appendChild(warning);

    }

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


/* 6. SHOW TYPING INDICATOR */

function showTyping() {

    const typing = document.createElement("div");

    typing.className = "typing-indicator";

    typing.id = "typingIndicator";

    typing.textContent = "Karnataka AI is preparing a demo response...";

    chatMessages.appendChild(typing);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


function removeTyping() {

    const typing = document.getElementById("typingIndicator");

    if (typing) {
        typing.remove();
    }

}


/* 7. SEND QUESTION */

function sendQuestion(question) {

    if (!question.trim()) return;

    welcomeScreen.style.display = "none";

    addMessage("user", question);

    currentConversation.push({
        role: "user",
        content: question
    });

    chatInput.value = "";

    sendBtn.disabled = true;

    showTyping();

    setTimeout(() => {

        removeTyping();

        const response = getDemoResponse(question);

        addMessage("assistant", response, true);

        currentConversation.push({
            role: "assistant",
            content: response
        });

        sendBtn.disabled = false;

        updateChatHistory(question);

    }, 900);

}


/* 8. FORM SUBMISSION */

chatForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const question = chatInput.value.trim();

    sendQuestion(question);

});


/* 9. SUGGESTED QUESTIONS */

document.querySelectorAll(".suggestion-card").forEach(button => {

    button.addEventListener("click", function() {

        const question = this.dataset.question;

        sendQuestion(question);

    });

});


/* 10. NEW CHAT */

function startNewChat() {

    if (currentConversation.length > 0) {

        conversations.push({
            id: conversationNumber++,
            messages: [...currentConversation]
        });

    }

    currentConversation = [];

    chatMessages.innerHTML = "";

    chatMessages.appendChild(welcomeScreen);

    welcomeScreen.style.display = "block";

    chatInput.value = "";

    chatInput.focus();

    renderChatHistory();

}


newChatBtn.addEventListener("click", startNewChat);


/* 11. CLEAR CURRENT CHAT */

clearChatBtn.addEventListener("click", function() {

    currentConversation = [];

    chatMessages.innerHTML = "";

    chatMessages.appendChild(welcomeScreen);

    welcomeScreen.style.display = "block";

    chatInput.value = "";

    renderChatHistory();

});


/* 12. UPDATE CHAT HISTORY */

function updateChatHistory(question) {

    const existing = conversations.find(
        item => item.id === conversationNumber
    );

    if (!existing) {

        conversations.push({
            id: conversationNumber,
            title: question,
            messages: [...currentConversation]
        });

        conversationNumber++;

    } else {

        existing.messages = [...currentConversation];

    }

    renderChatHistory();

}


/* 13. DISPLAY CHAT HISTORY */

function renderChatHistory() {

    chatHistory.innerHTML = "";

    conversations.forEach(conversation => {

        const item = document.createElement("div");

        item.className = "history-item";

        item.textContent =
            conversation.title || "Previous conversation";

        item.title = item.textContent;

        item.addEventListener("click", function() {

            currentConversation = [...conversation.messages];

            chatMessages.innerHTML = "";

            currentConversation.forEach(message => {

                addMessage(
                    message.role,
                    message.content,
                    message.role === "assistant"
                );

            });

            welcomeScreen.style.display = "none";

        });

        chatHistory.appendChild(item);

    });

    if (conversations.length === 0) {

        const empty = document.createElement("p");

        empty.className = "history-empty";

        empty.textContent =
            "Your conversations will appear here.";

        chatHistory.appendChild(empty);

    }

}


/* 14. LANGUAGE SELECTOR */

languageSelect.addEventListener("change", function() {

    currentLanguage = this.value;

    if (currentLanguage === "kn") {

        chatInput.placeholder =
            "ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಅಧಿಸೂಚನೆಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ...";

    } else {

        chatInput.placeholder =
            "Ask anything about Karnataka government notifications...";

    }

});


/* 15. FEEDBACK BUTTONS */

chatMessages.addEventListener("click", function(event) {

    const button = event.target.closest(".feedback-btn");

    if (!button) return;

    const feedback = button.dataset.feedback;

    const messageActions = button.parentElement;

    messageActions.querySelectorAll("button").forEach(item => {

        item.disabled = true;

        item.style.opacity = "0.4";

    });

    button.style.opacity = "1";

    button.innerHTML = feedback === "helpful"
        ? '<i class="fas fa-thumbs-up"></i>'
        : '<i class="fas fa-thumbs-down"></i>';

});


/* 16. MOBILE SIDEBAR */

mobileSidebarBtn.addEventListener("click", function() {

    chatSidebar.classList.toggle("open");

});


/* 17. AUTO-RESIZE TEXTAREA */

chatInput.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height =
        Math.min(this.scrollHeight, 120) + "px";

});


/* 18. INITIALIZE PAGE */

renderChatHistory();