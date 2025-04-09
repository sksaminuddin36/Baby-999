/**
 * Baby Gender Predictor - Main JavaScript File
 * Author: AI Assistant
 * Description: Script for the baby gender predictor website's interactive features
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initChinesePredictor();
    initHeartbeatQuiz();
    initWivesTalesQuiz();
    initRevealGenerator();
});

// ===== MOBILE NAVIGATION =====
function initNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Change icon based on menu state
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// ===== CHINESE GENDER PREDICTOR =====
function initChinesePredictor() {
    const predictBtn = document.getElementById('chinese-predict-btn');

    if (predictBtn) {
        predictBtn.addEventListener('click', function() {
            const motherAge = parseInt(document.getElementById('mother-age').value);
            const conceptionMonth = parseInt(document.getElementById('conception-month').value);
            const resultDiv = document.getElementById('chinese-result');

            // Validate inputs
            if (isNaN(motherAge) || motherAge < 18 || motherAge > 50) {
                displayChineseResult('error', 'Please enter a valid mother\'s age (18-50).');
                return;
            }

            if (isNaN(conceptionMonth) || conceptionMonth < 1 || conceptionMonth > 12) {
                displayChineseResult('error', 'Please select a valid conception month.');
                return;
            }

            // Calculate prediction using Chinese gender chart logic
            const gender = chineseGenderPrediction(motherAge, conceptionMonth);

            // Display result
            if (gender === 'boy') {
                displayChineseResult('boy', 'Boy! 👦');
            } else {
                displayChineseResult('girl', 'Girl! 👧');
            }
        });
    }
}

// Chinese Gender Prediction Logic
// Based on a simplified version of the traditional Chinese gender chart
function chineseGenderPrediction(motherAge, conceptionMonth) {
    // This is a simplified implementation of the Chinese gender prediction chart
    // The real chart is more complex, but this will work for our purposes
    // For a real implementation, use an actual lookup table based on lunar age/month

    // Create a simple algorithm based on age and month
    // In this simplified version, even combinations suggest a boy, odd combinations suggest a girl
    const ageLastDigit = motherAge % 10;
    const combination = (ageLastDigit + conceptionMonth) % 2;

    if (combination === 0) {
        return 'boy';
    } else {
        return 'girl';
    }
}

function displayChineseResult(type, message) {
    const resultDiv = document.getElementById('chinese-result');

    if (resultDiv) {
        const resultContent = resultDiv.querySelector('.result-content');

        resultContent.className = 'result-content'; // Reset classes

        if (type === 'error') {
            resultContent.innerHTML = `
                <p class="error">${message}</p>
                <p>Please check your inputs and try again.</p>
            `;
        } else if (type === 'boy') {
            resultContent.classList.add('boy-result');
            resultContent.innerHTML = `
                <i class="fas fa-baby" style="color: var(--blue);"></i>
                <h3 class="result-gender" style="color: var(--blue);">${message}</h3>
                <p>According to traditional Chinese gender prediction, you're likely having a boy!</p>
                <p class="result-explanation">Remember this is just for fun and not scientifically accurate.</p>
            `;
        } else if (type === 'girl') {
            resultContent.classList.add('girl-result');
            resultContent.innerHTML = `
                <i class="fas fa-baby" style="color: var(--pink);"></i>
                <h3 class="result-gender" style="color: var(--pink);">${message}</h3>
                <p>According to traditional Chinese gender prediction, you're likely having a girl!</p>
                <p class="result-explanation">Remember this is just for fun and not scientifically accurate.</p>
            `;
        }
    }
}

// ===== HEARTBEAT QUIZ =====
function initHeartbeatQuiz() {
    const quizBtn = document.getElementById('heartbeat-quiz-btn');

    if (quizBtn) {
        quizBtn.addEventListener('click', function() {
            // Collect all answers
            const heartrate = document.querySelector('input[name="heartrate"]:checked');
            const sickness = document.querySelector('input[name="sickness"]:checked');
            const cravings = document.querySelector('input[name="cravings"]:checked');
            const carrying = document.querySelector('input[name="carrying"]:checked');
            const skin = document.querySelector('input[name="skin"]:checked');

            // Check if all questions are answered
            if (!heartrate || !sickness || !cravings || !carrying || !skin) {
                displayHeartbeatResult('error', 'Please answer all questions before seeing your results.');
                return;
            }

            // Calculate points (more points favor a girl prediction)
            let girlPoints = 0;
            let totalPoints = 0;

            // Heartbeat logic (high heartrate suggests girl)
            if (heartrate.value === 'high') girlPoints++;
            if (heartrate.value !== 'unknown') totalPoints++;

            // Morning sickness logic (severe suggests girl)
            if (sickness.value === 'severe') girlPoints++;
            totalPoints++;

            // Cravings logic (sweets suggest girl, salty suggests boy)
            if (cravings.value === 'sweet') girlPoints++;
            if (cravings.value !== 'both') totalPoints++;

            // Carrying position logic (high suggests girl, low suggests boy)
            if (carrying.value === 'high') girlPoints++;
            if (carrying.value !== 'unsure') totalPoints++;

            // Skin changes logic (worse suggests girl, better suggests boy)
            if (skin.value === 'worse') girlPoints++;
            if (skin.value !== 'same') totalPoints++;

            // Calculate percentage of girl points
            const girlPercentage = (girlPoints / totalPoints) * 100;

            // Determine prediction with slight randomness for fun
            const randomFactor = Math.random() * 10 - 5; // Random value between -5 and 5
            const adjustedPercentage = girlPercentage + randomFactor;

            // Display result
            if (adjustedPercentage >= 50) {
                displayHeartbeatResult('girl', girlPoints, totalPoints);
            } else {
                displayHeartbeatResult('boy', totalPoints - girlPoints, totalPoints);
            }
        });
    }
}

function displayHeartbeatResult(type, points, total) {
    const resultDiv = document.getElementById('heartbeat-result');

    if (resultDiv) {
        const resultContent = resultDiv.querySelector('.result-content');

        resultContent.className = 'result-content'; // Reset classes

        if (type === 'error') {
            resultContent.innerHTML = `
                <p class="error">${points}</p>
                <p>Please complete all questions to get your prediction.</p>
            `;
        } else if (type === 'boy') {
            const percentage = Math.round((points / total) * 100);
            resultContent.classList.add('boy-result');
            resultContent.innerHTML = `
                <i class="fas fa-baby" style="color: var(--blue);"></i>
                <h3 class="result-gender" style="color: var(--blue);">Boy! 👦</h3>
                <p>Based on the heartbeat myth and your symptoms, you're likely having a boy!</p>
                <div class="percentage-bar">
                    <div class="percentage" style="width: ${percentage}%; background-color: var(--blue);"></div>
                </div>
                <p>${percentage}% of your answers suggest a boy.</p>
                <p class="result-explanation">According to old wives' tales, slower heartbeats, mild sickness, salty cravings, and carrying low all point toward a boy.</p>
            `;
        } else if (type === 'girl') {
            const percentage = Math.round((points / total) * 100);
            resultContent.classList.add('girl-result');
            resultContent.innerHTML = `
                <i class="fas fa-baby" style="color: var(--pink);"></i>
                <h3 class="result-gender" style="color: var(--pink);">Girl! 👧</h3>
                <p>Based on the heartbeat myth and your symptoms, you're likely having a girl!</p>
                <div class="percentage-bar">
                    <div class="percentage" style="width: ${percentage}%; background-color: var(--pink);"></div>
                </div>
                <p>${percentage}% of your answers suggest a girl.</p>
                <p class="result-explanation">According to old wives' tales, faster heartbeats, severe morning sickness, sweet cravings, and carrying high all point toward a girl.</p>
            `;
        }

        // Add CSS for percentage bar if not already in stylesheet
        const style = document.createElement('style');
        style.textContent = `
            .percentage-bar {
                width: 100%;
                height: 20px;
                background-color: #f0f0f0;
                border-radius: 10px;
                margin: 10px 0;
                overflow: hidden;
            }
            .percentage {
                height: 100%;
                border-radius: 10px;
                transition: width 1s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== OLD WIVES' TALES QUIZ =====
function initWivesTalesQuiz() {
    const quizBtn = document.getElementById('wives-tales-btn');

    if (quizBtn) {
        quizBtn.addEventListener('click', function() {
            // Collect all answers
            const key = document.querySelector('input[name="key"]:checked');
            const dreams = document.querySelector('input[name="dreams"]:checked');
            const mood = document.querySelector('input[name="mood"]:checked');
            const chinese = document.querySelector('input[name="chinese"]:checked');
            const ring = document.querySelector('input[name="ring"]:checked');
            const breasts = document.querySelector('input[name="breasts"]:checked');

            // Check if all questions are answered
            if (!key || !dreams || !mood || !chinese || !ring || !breasts) {
                displayWivesTalesResult('error', 'Please answer all questions before seeing your results.');
                return;
            }

            // Calculate points (more points favor a girl prediction)
            let girlPoints = 0;
            let totalPoints = 0;
            let explanations = [];

            // Key test logic
            if (key.value === 'round') {
                girlPoints++;
                explanations.push('You picked up the key by the round end, which suggests a girl.');
            } else {
                explanations.push('You picked up the key by the narrow end, which suggests a boy.');
            }
            totalPoints++;

            // Dream logic
            if (dreams.value === 'girl') {
                girlPoints++;
                explanations.push('Dreaming about girls suggests you\'re having a girl.');
            } else if (dreams.value === 'boy') {
                explanations.push('Dreaming about boys suggests you\'re having a boy.');
            }
            if (dreams.value !== 'neither') totalPoints++;

            // Mood logic
            if (mood.value === 'moody') {
                girlPoints++;
                explanations.push('Feeling moody or irritable suggests you\'re having a girl.');
            } else {
                explanations.push('Feeling mellow and happy suggests you\'re having a boy.');
            }
            totalPoints++;

            // Chinese chart answer
            if (chinese.value === 'girl') {
                girlPoints++;
                explanations.push('The Chinese birth chart indicated a girl.');
            } else if (chinese.value === 'boy') {
                explanations.push('The Chinese birth chart indicated a boy.');
            }
            if (chinese.value !== 'unknown') totalPoints++;

            // Ring test
            if (ring.value === 'circles') {
                girlPoints++;
                explanations.push('Your wedding ring moved in circles, suggesting a girl.');
            } else if (ring.value === 'line') {
                explanations.push('Your wedding ring moved in a line, suggesting a boy.');
            }
            if (ring.value !== 'notried') totalPoints++;

            // Breast changes
            if (breasts.value === 'left') {
                girlPoints++;
                explanations.push('Your left breast being larger suggests a girl.');
            } else if (breasts.value === 'right') {
                explanations.push('Your right breast being larger suggests a boy.');
            }
            if (breasts.value !== 'equal') totalPoints++;

            // Calculate percentage of girl points
            let finalResult = '';
            let resultGender = '';

            if (totalPoints === 0) {
                finalResult = 'Based on your answers, we don\'t have enough information to make a prediction.';
                resultGender = 'Inconclusive';
            } else {
                const girlPercentage = Math.round((girlPoints / totalPoints) * 100);
                const boyPercentage = 100 - girlPercentage;

                if (girlPercentage > boyPercentage) {
                    resultGender = 'girl';
                    finalResult = `Based on old wives' tales, you're more likely to be having a girl! (${girlPercentage}% girl / ${boyPercentage}% boy)`;
                } else if (boyPercentage > girlPercentage) {
                    resultGender = 'boy';
                    finalResult = `Based on old wives' tales, you're more likely to be having a boy! (${boyPercentage}% boy / ${girlPercentage}% girl)`;
                } else {
                    resultGender = 'tie';
                    finalResult = 'It\'s a tie! The old wives\' tales are evenly split between boy and girl predictions.';
                }
            }

            displayWivesTalesResult(resultGender, finalResult, explanations);
        });
    }
}

function displayWivesTalesResult(type, result, explanations) {
    const resultDiv = document.getElementById('wives-tales-result');

    if (resultDiv) {
        const resultContent = resultDiv.querySelector('.result-content');

        resultContent.className = 'result-content'; // Reset classes

        if (type === 'error') {
            resultContent.innerHTML = `
                <p class="error">${result}</p>
                <p>Please complete all questions to get your prediction.</p>
            `;
        } else if (type === 'boy') {
            resultContent.classList.add('boy-result');

            let explanationHTML = '';
            if (explanations && explanations.length > 0) {
                explanationHTML = '<h4>How we determined this:</h4><ul>';
                explanations.forEach(item => {
                    explanationHTML += `<li>${item}</li>`;
                });
                explanationHTML += '</ul>';
            }

            resultContent.innerHTML = `
                <i class="fas fa-baby" style="color: var(--blue);"></i>
                <h3 class="result-gender" style="color: var(--blue);">Boy! 👦</h3>
                <p>${result}</p>
                ${explanationHTML}
                <p class="result-explanation">Remember, these are just old wives' tales and not scientifically accurate.</p>
            `;
        } else if (type === 'girl') {
            resultContent.classList.add('girl-result');

            let explanationHTML = '';
            if (explanations && explanations.length > 0) {
                explanationHTML = '<h4>How we determined this:</h4><ul>';
                explanations.forEach(item => {
                    explanationHTML += `<li>${item}</li>`;
                });
                explanationHTML += '</ul>';
            }

            resultContent.innerHTML = `
                <i class="fas fa-baby" style="color: var(--pink);"></i>
                <h3 class="result-gender" style="color: var(--pink);">Girl! 👧</h3>
                <p>${result}</p>
                ${explanationHTML}
                <p class="result-explanation">Remember, these are just old wives' tales and not scientifically accurate.</p>
            `;
        } else if (type === 'tie') {
            resultContent.innerHTML = `
                <div style="display: flex; justify-content: center; gap: 20px;">
                    <i class="fas fa-baby" style="color: var(--blue);"></i>
                    <i class="fas fa-baby" style="color: var(--pink);"></i>
                </div>
                <h3 class="result-gender">It's a tie! 👦👧</h3>
                <p>${result}</p>
                <p class="result-explanation">The old wives' tales are evenly split - maybe it's twins?</p>
            `;
        } else {
            resultContent.innerHTML = `
                <h3>Inconclusive</h3>
                <p>${result}</p>
                <p class="result-explanation">Try answering more questions to get a prediction.</p>
            `;
        }

        // Style for the explanations list
        const style = document.createElement('style');
        style.textContent = `
            .result-content ul {
                text-align: left;
                margin: 15px 0;
                padding-left: 20px;
            }
            .result-content ul li {
                margin-bottom: 5px;
                list-style-type: circle;
            }
            .result-content h4 {
                margin-top: 15px;
                margin-bottom: 10px;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== GENDER REVEAL IDEA GENERATOR =====
function initRevealGenerator() {
    const generateBtn = document.getElementById('reveal-generator-btn');

    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const ideaBox = document.getElementById('reveal-idea');
            const randomIdea = getRandomRevealIdea();

            if (ideaBox) {
                ideaBox.innerHTML = `
                    <h3>${randomIdea.title}</h3>
                    <p>${randomIdea.description}</p>
                    ${randomIdea.extra ? `<p class="idea-extra">${randomIdea.extra}</p>` : ''}
                `;
            }
        });
    }
}

function getRandomRevealIdea() {
    const ideas = [
        {
            title: "Balloon Box Surprise",
            description: "Fill a large box with helium balloons in either pink or blue, and open it to reveal the gender!"
        },
        {
            title: "Confetti Cannon Pop",
            description: "Use confetti cannons with blue or pink confetti for an explosive gender reveal moment."
        },
        {
            title: "Gender Reveal Cake",
            description: "Cut into a cake with either blue or pink filling inside to reveal your baby's gender."
        },
        {
            title: "Smoke Bomb Photography",
            description: "Use colored smoke bombs (pink or blue) for a dramatic outdoor gender reveal photoshoot."
        },
        {
            title: "Paint Splatter Canvas",
            description: "Throw darts at paint-filled balloons on a canvas to create a gender reveal masterpiece."
        },
        {
            title: "Scratch-Off Cards",
            description: "Create custom scratch-off cards revealing the gender for family and friends."
        },
        {
            title: "Powder Blasters",
            description: "Use powder blasters that shoot colored cornstarch for an exciting outdoor reveal."
        },
        {
            title: "Sibling Surprise",
            description: "Have older siblings open a gift box with colored items to announce their new brother or sister."
        },
        {
            title: "Piñata Reveal",
            description: "Break open a piñata filled with blue or pink candies, confetti, or small toys."
        },
        {
            title: "Balloon Dart Game",
            description: "Set up a board of black balloons, with one special balloon containing colored powder."
        },
        {
            title: "Christmas Ornament",
            description: "If revealing during winter, use a special ornament that opens to reveal blue or pink inside."
        },
        {
            title: "Silly String Fight",
            description: "Hand out cans of silly string covered in paper to guests, all revealing the same color."
        },
        {
            title: "Puzzle Announcement",
            description: "Create a custom puzzle that when completed, reveals the gender of your baby."
        },
        {
            title: "Color Changing Drink",
            description: "Serve a drink that changes color when an ingredient is added to reveal the gender."
        },
        {
            title: "Pet Announcement",
            description: "Tie a blue or pink bandana on your pet and let them 'announce' the gender to family and friends."
        }
    ];

    // Add safety message to all ideas
    ideas.forEach(idea => {
        idea.extra = "Remember: Always prioritize safety in your gender reveal. Avoid explosives, fire hazards, or environmentally harmful materials.";
    });

    return ideas[Math.floor(Math.random() * ideas.length)];
}

// ===== ADDITIONAL UTILITY FUNCTIONS =====

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});
