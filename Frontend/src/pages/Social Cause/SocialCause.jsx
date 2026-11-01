import './SocialCause.css';
import VerticalMarquee from '/src/components/VerticalMarquee/VerticalMarquee.jsx';
import SocialCauseImage from '/src/assets/social-cause-image.jpg';
import {Helmet} from 'react-helmet';

function SocialCause() {
  return (
    <>
      <Helmet>
        <title>Elan&nVision | Social Cause</title>
      </Helmet>
      <VerticalMarquee/>
      <div className='social-cause'>
        <div className='social-cause-title'>Social Cause</div>
        <div className='social-cause-description'>

          <div className='social-cause-description-text'>
            Every year, we have a social theme for our fest in support of a community cause. The
            main fest features talks given by prominent people who wish to support the cause.
            Meanwhile we do our fair share of engagement through social media campaigns and
            raising money through charity for the cause. Last year the social cause theme was
            ‘Healing little hearts’, an endeavour launched by the Elan & nVision team to make sure
            that little children get the medical help they so rightly deserve. Every year, thousands of
            innocent children perish due to lack of medical care. We at Elan & nVision hope to do
            our best to change this grim reality. We believe every child has a right to a healthy life,
            and it is our duty as a society to make that happen. As part of this initiative, we
            organized talks and seminars to spread awareness among the student community here
            at IITH. We also collected money through charity to fund local orphanages.
          </div>
          <div className='social-cause-description-img-cont'>
            <img src={SocialCauseImage} alt='Social Cause Image' className='social-cause-description-img'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialCause;