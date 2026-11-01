import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer className='footer' id='footer'>
      <div className='footer-inner'>
        <div className='upper-footer'>
          <span className='footer-heading'>SEND US A MAIL</span>
          <div className='mail-wrapper'>
            <a
              href='mailto:elan.nvision@sa.iith.ac.in'
              className='footer-mail'
              id='mail'
            >
              elan.nvision@sa.iith.ac.in
            </a>
          </div>
        </div>

        <div className='middle-footer'>
          <div className='contact-socials'>
            <span className='footer-heading socials-heading'>SOCIALS</span>
            <div className='socials-inner'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.instagram.com/elan_nvision.iith'
                className='social-link social-link--instagram'
                aria-label='Instagram'
              >
                <FontAwesomeIcon icon={['fab', 'instagram']} size='2x' />
              </a>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.facebook.com/elannvision.iithyderabad/'
                className='social-link social-link--facebook'
                aria-label='Facebook'
              >
                <FontAwesomeIcon icon={['fab', 'facebook-f']} size='2x' />
              </a>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://x.com/elan_nvision'
                className='social-link social-link--twitter'
                aria-label='X (Twitter)'
              >
                <FontAwesomeIcon icon={['fab', 'x-twitter']} size='2x' />
              </a>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.linkedin.com/company/elan-nvision-iith/'
                className='social-link social-link--linkedin'
                aria-label='LinkedIn'
              >
                <FontAwesomeIcon icon={['fab', 'linkedin-in']} size='2x' />
              </a>
            </div>
          </div>
        </div>

        <div className='bottom-footer'>
          <p className='copyright-text'>
            © {new Date().getFullYear()} Elan &amp; ηVision · IIT Hyderabad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;