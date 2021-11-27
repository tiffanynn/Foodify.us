import React from 'react';
import logoTitle from "../../Images/logoTitle.jpg";

export default function Footer() {
    return (
        <div class="footer navbar-fixed-bottom">
            <p class="m-3 text-center">
                Copyright © 2021 Foodify.us  <img src={logoTitle} style={{ width: 'auto', height: '25px', marginBottom: '2px' }}></img>    and related marks are registered trademarks of Foodify.
            </p>
        </div>
    );
}