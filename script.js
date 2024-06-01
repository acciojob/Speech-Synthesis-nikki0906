// Your script here.
const textArea = document.getElementById('text');
        const voiceSelect = document.getElementById('voiceSelect');
        const rate = document.getElementById('rate');
        const pitch = document.getElementById('pitch');
        const startButton = document.getElementById('start');
        const stopButton = document.getElementById('stop');

        let synth = window.speechSynthesis;
        let voices = [];

        function populateVoices() {
            voices = synth.getVoices();
            voiceSelect.innerHTML = voices
                .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
                .join('');
        }

        populateVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoices;
        }

        function speak() {
            if (synth.speaking) {
                console.error('SpeechSynthesisUtterance is already speaking.');
                return;
            }
            if (textArea.value !== '') {
                const utterThis = new SpeechSynthesisUtterance(textArea.value);
                const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
                utterThis.voice = selectedVoice;
                utterThis.rate = rate.value;
                utterThis.pitch = pitch.value;
                synth.speak(utterThis);
            }
        }

        function stop() {
            synth.cancel();
        }

        startButton.addEventListener('click', () => {
            speak();
        });

        stopButton.addEventListener('click', () => {
            stop();
        });
