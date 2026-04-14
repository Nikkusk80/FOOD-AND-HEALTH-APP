// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(20, 25, 40, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(20, 25, 40, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Scroll Reveal Animations using IntersectionObserver
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // FutureYou Simulator Logic
    const slider = document.getElementById('habitSlider');
    const sliderOutput = document.getElementById('sliderOutput');
    const weightPrediction = document.getElementById('weightPrediction');
    const energyBar = document.getElementById('energyBar');
    const healthRisk = document.getElementById('healthRisk');
    const aiInsight = document.getElementById('aiInsight');

    function updateSimulator(value) {
        // Value ranges from 0 (very unhealthy) to 100 (very healthy)
        let weightStr = "";
        let energyWidth = value + "%";
        let riskLvl = "";
        let insightMsg = "";

        if (value < 30) {
            // Unhealthy range
            sliderOutput.textContent = `Destructive Habits (${value}/100)`;
            sliderOutput.style.color = "var(--danger)";
            weightStr = "+4.5 kg";
            weightPrediction.style.color = "var(--danger)";
            energyBar.style.background = "var(--danger)";
            riskLvl = "High";
            healthRisk.style.color = "var(--danger)";
            insightMsg = "\"Warning: Current trajectory shows high risk of weight gain and lethargy. You need an intervention.\"";
        } else if (value >= 30 && value < 70) {
            // Moderate range
            sliderOutput.textContent = `Moderate Balance (${value}/100)`;
            sliderOutput.style.color = "var(--warning)";
            if(value < 50) {
                weightStr = "+1 kg";
            } else {
                weightStr = "Maintenance";
            }
            weightPrediction.style.color = "var(--warning)";
            energyBar.style.background = "var(--warning)";
            riskLvl = "Medium";
            healthRisk.style.color = "var(--warning)";
            insightMsg = "\"Your habits are neutral. Small, targeted nudges could shift you into a fat-burning state.\"";
        } else {
            // Healthy range
            sliderOutput.textContent = `Optimized Flow (${value}/100)`;
            sliderOutput.style.color = "var(--success)";
            weightStr = "-2.5 kg";
            weightPrediction.style.color = "var(--success)";
            energyBar.style.background = "var(--success)";
            riskLvl = "Low (Optimal)";
            healthRisk.style.color = "var(--success)";
            insightMsg = "\"Incredible work. Your consistency predicts significant fat loss and peak energy over 30 days.\"";
        }

        weightPrediction.textContent = weightStr;
        energyBar.style.width = energyWidth;
        healthRisk.textContent = riskLvl;
        aiInsight.textContent = insightMsg;
    }

    // Initialize simulate on load
    updateSimulator(slider.value);

    // Add event listener to slider
    slider.addEventListener('input', (e) => {
        updateSimulator(e.target.value);
    });

});
