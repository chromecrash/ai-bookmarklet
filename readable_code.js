"use strict";

(async () => {
    let chatModalVisible = false;
    let chatModal;
    const chatModalUrl = "https://aiassistantbot.surge.sh/";

    function getBackgroundColor() {
        const bodyStyles = window.getComputedStyle(document.body);
        return bodyStyles.backgroundColor || '#000';
    }

    const toggleChatButton = document.createElement('button');
    toggleChatButton.innerText = '💬';
    toggleChatButton.id = 'toggleChatButton';
    toggleChatButton.style.position = 'fixed';
    toggleChatButton.style.bottom = '10px';
    toggleChatButton.style.right = '70px';
    toggleChatButton.style.zIndex = '9999';
    toggleChatButton.style.width = '60px';
    toggleChatButton.style.height = '60px';
    toggleChatButton.style.backgroundColor = getBackgroundColor();
    toggleChatButton.style.color = '#fff';
    toggleChatButton.style.border = 'none';
    toggleChatButton.style.borderRadius = '50%';
    toggleChatButton.style.cursor = 'pointer';
    toggleChatButton.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
    toggleChatButton.style.fontSize = '24px';
    toggleChatButton.style.display = 'flex';
    toggleChatButton.style.opacity = '0.5';
    toggleChatButton.style.alignItems = 'center';
    toggleChatButton.style.justifyContent = 'center';
    toggleChatButton.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
    document.body.appendChild(toggleChatButton);

    toggleChatButton.addEventListener('mouseenter', (event) => {
        const buttonRect = toggleChatButton.getBoundingClientRect();
        const angle = Math.atan2(event.clientY - (buttonRect.top + buttonRect.height / 2), event.clientX - (buttonRect.left + buttonRect.width / 2));
        toggleChatButton.style.transform = scale(1.1) rotate(${angle}rad);
        toggleChatButton.style.backgroundColor = lightenColor(getBackgroundColor(), 90);
        toggleChatButton.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.3)';
        toggleChatButton.style.opacity = '1';
    });

    toggleChatButton.addEventListener('mouseleave', () => {
        toggleChatButton.style.transform = 'scale(1) rotate(0rad)';
        toggleChatButton.style.backgroundColor = getBackgroundColor();
        toggleChatButton.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
        toggleChatButton.style.opacity = '0.5';
    });

    toggleChatButton.addEventListener('click', () => {
        if (chatModalVisible) {
            closeChatModal();
        } else {
            openChatModal();
        }
        chatModalVisible = !chatModalVisible;
    });

    function lightenColor(color, percent) {
        var num = parseInt(color.replace('#',''),16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            B = (num >> 8 & 0x00FF) + amt,
            G = (num & 0x0000FF) + amt;

        return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
    }

    function openChatModal() {
        if (!chatModal) {
            createChatModal();
        }
        chatModal.style.opacity = '1';
        chatModal.style.transform = 'translate(-50%, -50%) scale(1)';
        document.getElementById('toggleChatButton').innerText = '💬';
    }

    function closeChatModal() {
        if (chatModal) {
            chatModal.style.opacity = '0';
            chatModal.style.transform = 'translate(-50%, -50%) scale(0.9)';
            document.getElementById('toggleChatButton').innerText = '💬';
        }
    }

    function createChatModal() {
        chatModal = document.createElement('div');
        chatModal.id = 'chatModal';
        chatModal.style.position = 'fixed';
        chatModal.style.top = '50%';
        chatModal.style.left = '50%';
        chatModal.style.transform = 'translate(-50%, -50%) scale(0.9)';
        chatModal.style.opacity = '0';
        chatModal.style.width = '700px';
        chatModal.style.height = '500px';
        chatModal.style.zIndex = '10000';
        chatModal.style.backgroundColor = '#fff';
        chatModal.style.borderRadius = '8px';
        chatModal.style.overflow = 'hidden';
        chatModal.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.1)';
        chatModal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        const draggableArea = document.createElement("div");
        draggableArea.style.width = "100%";
        draggableArea.style.height = "30px";
        draggableArea.style.cursor = "move";
        draggableArea.style.background = 'linear-gradient(90deg, #f6f8fa, #e1e4e8)';
        draggableArea.style.position = "absolute";
        draggableArea.style.top = "0";
        draggableArea.style.left = "0";
        draggableArea.style.borderTopLeftRadius = "8px";
        draggableArea.style.borderTopRightRadius = "8px";
        draggableArea.style.userSelect = "none";
        draggableArea.style.display = 'flex';
        draggableArea.style.alignItems = 'center';
        draggableArea.style.padding = '0 10px';
        draggableArea.style.color = '#24292e';
        draggableArea.innerText = 'Chat Modal';
        draggableArea.style.fontFamily = 'Roboto, sans-serif';
        draggableArea.style.fontWeight = 'bold';

        let isDragging = false;
        let offsetX, offsetY;

        draggableArea.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - chatModal.offsetLeft;
            offsetY = e.clientY - chatModal.offsetTop;
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
                chatModal.style.left = ${x}px;
                chatModal.style.top = ${y}px;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });

        chatModal.appendChild(draggableArea);

        const chatIframe = document.createElement('iframe');
        chatIframe.src = chatModalUrl;
        chatIframe.id = 'chatIframe';
        chatIframe.style.position = 'absolute';
        chatIframe.style.top = '30px';
        chatIframe.style.left = '0';
        chatIframe.style.width = '100%';
        chatIframe.style.height = 'calc(100% - 30px)';
        chatIframe.style.border = 'none';

        chatModal.appendChild(chatIframe);
        document.body.appendChild(chatModal);
    }
})();
