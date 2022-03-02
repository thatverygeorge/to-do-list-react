import React from 'react';

const MadeBy = () => {
  return (
    <section className='made-by main__made-by'>
      <h2 className='made-by__title'>Made by @thatverygeorge</h2>
      <ul className='made-by__list'>
        <li>
          <a href='https://github.com/thatverygeorge' target='_blank'>
            GitHub
          </a>
        </li>
        <li>
          <a href='https://twitter.com/thatverygeorge' target='_blank'>
            Twitter
          </a>
        </li>
        <li>
          <a href='https://t.me/thatverygeorge' target='_blank'>
            Telegram
          </a>
        </li>
      </ul>
    </section>
  );
};

export default MadeBy;
