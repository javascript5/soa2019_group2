import React, {Component} from 'react'
import Wrapper from '../Components/Wrapper'
import styled from 'styled-components'
import pattern_home_bg from '../Assets/images/home_bg_pattern.svg'

const HomeWrapper = styled.div`
        background-color:#008FF6;
        background-image:url(${pattern_home_bg});
        background-size:cover;
        height:100vh;
        
        `
class Home extends Component{
    render(){

        return(
            <HomeWrapper>
                <Wrapper>
                    sss
                </Wrapper>
            </HomeWrapper>
        )
    }
}

export default Home