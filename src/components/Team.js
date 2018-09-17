import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'
import OutsideClickHandler from 'react-outside-click-handler'

import BreakPoints from './BreakPoints'

const TeamMemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${BreakPoints({
    alignItems: ['center', 'flex-start', 'flex-start'],
    padding: ['0 50px', '60px 80px', '60px 100px'],
  })};

  /* Unfortunately necessary */
  div {
    width: 100%;
  }
`

const TeamMember = styled.div`
  width: 100%;
  ${BreakPoints({
    marginBottom: ['50px', '100px', '100px'],
  })};
`

const TeamMemberInformation = styled.div`
  padding-bottom: 30px;
  border-bottom: 1px solid #b7b7b7;
  cursor: pointer;
`

const TeamMemberName = styled.p`
  font-weight: 700;
`

const TeamMemberData = styled.div`
  display: flex;
  justify-content: space-between;
`

const TeamMemberStatus = styled.div``

const TeamMemberStatusItem = styled.span`
  font-size: 1rem;
`

const TeamMoreAction = styled.span`
  font-weight: 700;
`

const TeamMemberCurriculum = styled.div``

const Team = ({ indexTeamMember, setIndexTeamMember, team }) => (
  <TeamMemberWrapper>
    {team.map((teamMember, idx) => (
      <TeamMember onClick={() => setIndexTeamMember(idx)}>
        <OutsideClickHandler key={teamMember.title} onOutsideClick={() => setIndexTeamMember(null)}>
          <TeamMemberInformation>
            <TeamMemberName>{teamMember.title}</TeamMemberName>
            <TeamMemberData>
              <TeamMemberStatus>
                <TeamMemberStatusItem>{teamMember.position} </TeamMemberStatusItem>
                <TeamMemberStatusItem>{teamMember.specialty} </TeamMemberStatusItem>
                <TeamMemberStatusItem>{teamMember.city}</TeamMemberStatusItem>
              </TeamMemberStatus>

              <TeamMoreAction>{indexTeamMember === idx ? '−' : '+'}</TeamMoreAction>
            </TeamMemberData>
          </TeamMemberInformation>
          {indexTeamMember === idx && (
            <TeamMemberCurriculum dangerouslySetInnerHTML={{ __html: teamMember.curriculum }} />
          )}
        </OutsideClickHandler>
      </TeamMember>
    ))}
  </TeamMemberWrapper>
)

Team.propTypes = {
  indexTeamMember: PropTypes.number,
  setIndexTeamMember: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(
    PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        specialty: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
      }),
    }),
  ),
}

export default compose(
  withStateHandlers(
    { indexTeamMember: null },
    {
      setIndexTeamMember: () => value => ({ indexTeamMember: value }),
    },
  ),
)(Team)
