import './Team.css';
import VerticalMarquee from '/src/components/VerticalMarquee/VerticalMarquee.jsx';

import {
  creatives_team,
  culti_biggies_team,
  eml_team,
  heads,
  hospitality_team,
  informals_team,
  infrastructure_team,
  lit_team,
  multimedia_team,
  overall,
  production_team,
  pronites_team,
  public_relations_team,
  publicity_team,
  security_team,
  social_cause_team,
  sponsorship_team,
  techy_team, transport_team,
  web_team,
  workshop_team,
  logistics_team
} from '/src/data/team.js';
import {Helmet} from 'react-helmet';


function Team() {
  return (
    <>
      <Helmet>
        <title>Elan&nVision | Team</title>
      </Helmet>
      <VerticalMarquee/>
      <div className='team'>
        <div className='team-page-title'>Our team</div>
        <div className='team-cont'>


          <div className='team-inner'>
            <div className='team-head-cont'>
              {
                overall.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                    <div className='person-card-position'>{person.position}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-head-cont'>
              {
                heads.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                    <div className='person-card-position'>{person.position}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Workshops</div>
            <div className='team-coord-cont'>
              {
                workshop_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Techy</div>
            <div className='team-coord-cont'>
              {
                techy_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Production</div>
            <div className='team-coord-cont'>
              {
                production_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Pronites</div>
            <div className='team-coord-cont'>
              {
                pronites_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Sponsorship</div>
            <div className='team-coord-cont'>
              {
                sponsorship_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Infrastructure</div>
            <div className='team-coord-cont'>
              {
                infrastructure_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Security</div>
            <div className='team-coord-cont'>
              {
                security_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Informals</div>
            <div className='team-coord-cont'>
              {
                informals_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>


          <div className='team-inner'>
            <div className='team-title'>Social cause</div>
            <div className='team-coord-cont'>
              {
                social_cause_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Creatives</div>
            <div className='team-coord-cont'>
              {
                creatives_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Multimedia</div>
            <div className='team-coord-cont'>
              {
                multimedia_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Culti & biggies</div>
            <div className='team-coord-cont'>
              {
                culti_biggies_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>LIT</div>
            <div className='team-coord-cont'>
              {
                lit_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>EML</div>
            <div className='team-coord-cont'>
              {
                eml_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Public Relations</div>
            <div className='team-coord-cont'>
              {
                public_relations_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='team-inner'>
            <div className='team-title'>Publicity</div>
            <div className='team-coord-cont'>
              {
                publicity_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Web</div>
            <div className='team-coord-cont'>
              {
                web_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Hospitality</div>
            <div className='team-coord-cont'>
              {
                hospitality_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Transport</div>
            <div className='team-coord-cont'>
              {
                transport_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='team-inner'>
            <div className='team-title'>Logistics</div>
            <div className='team-coord-cont'>
              {
                logistics_team.map((person, index) => (
                  <div className='person-card' key={index}>
                    <div className='person-card-img'>
                      <img src={person.image} alt=''/>
                    </div>
                    <div className='person-card-name'>{person.name}</div>
                  </div>
                ))
              }
            </div>
          </div>


        </div>
      </div>
    </>
  );
}

export default Team;