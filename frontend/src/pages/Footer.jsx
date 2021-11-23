import React from 'react';

function Footer(){
    return(
        <div className="footer">
            <footer class="py-3 bg-darl fixed-bottom"
                style={{ 
                position: 'relative',
                bottom: '0'
                }}
            >
                    <p class="m-3 text-center">
                    Copyright © 2021 Foodify.us      Foodify and related marks are registered trademarks of Foodify.
                    </p>
            </footer>
        </div>
    );
}

export default Footer;