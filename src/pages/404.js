import React from 'react';
import { Link } from 'gatsby';
import Page from '../components/page';

export default () => {
  return <Page title="4-7-8 Breathing">
    <div className="space"/>
    <div>
      <h1>Page not found</h1>
    </div>
    <div className="space"/> 
    <div className="footer">
      <Link to="/" aria-label="Back">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 512 512" height="30px">
          <path fill="#ffffff" d="M240 424v-96c116.4 0 159.39 33.76 208 96 0-119.23-39.57-240-208-240V88L64 256z" stroke-linejoin="round" class="ionicon-fill-none ionicon-stroke-width"></path>
        </svg>
      </Link>
    </div>
  </Page>
}
