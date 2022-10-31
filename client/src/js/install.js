const butInstall = document.getElementById('buttonInstall');
// Installing PWA logic

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store events and taken off hidden class
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }

    // Showing the prompt
    promptEvent.prompt();

    // Reset deferred prompt var, use limited to once.
    window.deferredPrompt = null;

    //   Remove class from btn- hidden class
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clearing the prompt
    window.deferredPrompt = null;
});
