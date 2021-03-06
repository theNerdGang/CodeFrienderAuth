import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';

import './style.css';
import './../Banner/shadows.css';



import SignIn from './../SignIn';
// import { connect } from 'mongoose';
import BgImage from './assets/images/devcollab.png';
import DevImage from './assets/images/backend.jpg';

// Heads up!
// We are using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container className='customShadows' styles={{ backgroundImage: `url(${BgImage})` }} text>
    <Header
    
      // className='customShadows'
      as='h1'
      inverted
      style={{
        fontSize: mobile ? '2em' : '3em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '2em',
      }}
    >
      <Icon name='code branch' />
      Code Friender
    </Header>
    <Header
      as='h2'
      content='Mentor | Collaborate | Apprentice'
      inverted
      style={{
        // textShadow: '2px 2px 6px #000000',
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginBottom: '1.7em',
        marginTop: mobile ? '0.5em' : '1.2em',
      }}
    />
    <Button as={Link} to='/signup' active primary size='huge'>
      <span className='customShadows'>Let's Get Started</span>
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}


class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}
     
      >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            className='landingImage customDimmension'
           
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as={Link} to='/' active>
                  <span className='customShadows' >Home</span>
                </Menu.Item>
                <Menu.Item as={Link} to='/match'><span className='customShadows'>Match</span></Menu.Item>
                <Menu.Item as={Link} to='/profile'><span className='customShadows'>Profile</span></Menu.Item>
                <Menu.Item as={Link} to='/dashboard'><span className='customShadows'>Dashboard</span></Menu.Item>
                <Menu.Item position='right'>
                  <SignIn />
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} to='/homepage' active>
            Home
          </Menu.Item>
          <Menu.Item as={Link} to='/match'>Match</Menu.Item>
          <Menu.Item as={Link} to='/profile'>Profiles</Menu.Item>
          {/* change this if not using */}
          <Menu.Item as={Link} to='/dashboard'>DashBoard?</Menu.Item>
          <Menu.Item stackable>
            <SignIn />
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment className='segstyle'
            inverted
            textAlign='center'
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <SignIn />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

// change to match the CodeFriender's mission statement
//show off the features of the CodeFriender's application as much as possible
const HomepageLayout = () => (
  <ResponsiveContainer
    className="landingImage">
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              A friend(er) in need
              ...is a friend indeed.
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              As students of the coding arts, we are fully aware of the need to find a team of like-minded students to fill the gap between classroom and home learning. Now you can find the perfect study buddy to help you crack the code.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Simple as 1, 2, 3...
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              1. Enter you github username and password
              <br>

              </br>
              2. List your strength and weakness in the coding field
              <br>

              </br>
              3. Find the perfect Code Friend
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src={DevImage} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "I felt like I was fighting a war against React"
            </Header>
            <p style={{ fontSize: '1.33em' }}>..until I realized there was an army on my side. Code warriors!!</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Some of the people I've met on Code Friender have become my fellow employees."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
             
            -Shlomo Pleban - Chief Engineer/Microsoft
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          When you hit a wall...know who to call.
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          We know that learning to communicate with computers can be difficult. Discouraging at best, infuriating at worst. Use the chat component to ask questions without engaging in a full on study session. Get in the zone. Stay in the zone.
        </p>
        

        <Divider
          as='h4'
          className='header'
          al
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          From Code Friend to Colleague
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          You are more likely to gain employment through someone you know outside of the interview environment. Why not increase your chances of getting noticed by sharing your skill set with thousands of local, established, and learning developers. #friendUp
        </p>
        <a href="https://www.linkedin.com/pulse/7-reasons-have-study-buddy-carolyn-mcintyre/" target="_blank" rel="noopener noreferrer">
          <Button size='large'>7 reasons to join Code Friender</Button>
        </a>

      </Container>
    </Segment>
    <Segment style='grad' inverted vertical style={{ padding: '5em 0em' }}>

      <Container className='grad'>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List className='grad' link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Careers</List.Item>
                <List.Item as='a'>Code Friender FAQ</List.Item>

              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as='h4' inverted>
                The Developers
              </Header>

                <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column stretched={true}>
                    <Menu.Item as='a' name='profile' href='https://github.com/adrianromero13' target='_blank' rel="noopener noreferrer">
                    <Image src='https://avatars0.githubusercontent.com/u/25410826?v=4' alt='avatar' avatar={true}/>
                Adrian Romero
              </Menu.Item>

                    <Menu.Item as='a' name='profile' href='https://github.com/armande925' target='_blank' rel="noopener noreferrer">
                    <Image src='https://avatars0.githubusercontent.com/u/58568984?v=4' alt='avatar' avatar={true}/>
                Armande Milhouse
              </Menu.Item>
                  </Grid.Column>

                  <Grid.Column stretched={true}>
                    <Menu.Item as='a' name='profile' href='https://github.com/markmesina' target='_blank' rel="noopener noreferrer">
                      <Image src='https://avatars1.githubusercontent.com/u/58279053?v=4' alt='avatar' avatar={true}/>
                Mark Mesina
              </Menu.Item>

                    <Menu.Item as='a' name='profile' href='https://github.com/markyounan11' target='_blank' rel="noopener noreferrer">
                    <Image src='https://avatars1.githubusercontent.com/u/55516573?v=4' alt='avatar' avatar={true}/>
                Mark Younan
              </Menu.Item>
                  </Grid.Column>
                </Grid.Row>
                </Grid>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

function mapstateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapstateToProps)(HomepageLayout);
