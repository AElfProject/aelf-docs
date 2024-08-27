import React, { useEffect } from 'react';

const ChatComponent = () => {
  const [styles, setStyles] = React.useState({
    bottom: '-90px',
    width: '100px',
    height: '170px'
  });
  useEffect(() => {
    const handleResizeMessage = (event) => {
      if (event.data.action === 'resizeChat') {
        console.log('resizeChat: ', event.data.bottom, event.data.width, event.data.height);
        setStyles({
          bottom: event.data.bottom,
          width: event.data.width,
          height: event.data.height,
        })
        // const chatIframe = document.getElementById('paal-chat');
        // if (chatIframe) {
        //   chatIframe.style.width = event.data.width;
        //   chatIframe.style.height = event.data.height;
        //   chatIframe.style.bottom = event.data.bottom;
        // }
      }
    };

    window.addEventListener('message', handleResizeMessage, false);

    return () => {
      window.removeEventListener('message', handleResizeMessage);
    };
  }, []);

  return (
    <div>
      <iframe
        id="paal-chat"
        src="https://app.paal.ai/wg?bid=ccee00d2"
        allowTransparency={true}
        style={{
          colorScheme: 'normal',
          border: 'none',
          position: 'fixed',
          right: '-20px',
          bottom: styles.bottom,
          width: styles.width,
          height: styles.height,
          zIndex: 9999,
          backgroundColor: 'transparent',
        }}
        frameBorder="0"
      />
    </div>
  );
};

export default ChatComponent;
