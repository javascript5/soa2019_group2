import React, { Component } from 'react'
import styled from 'styled-components'
import Wrapper from './Wrapper'
import Button, { ActiveButton } from './Button'
var NavbarOutside = styled.div`
border-bottom:1px solid #E8EEF2;
background-color:#fff;
`


var NavbarWrapper = styled.div`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
`


var Logo = styled.a`
    font-size:1.4em;
    padding-top:20px;
    padding-bottom:20px;
    font-family:'Prompt', sans-serif;
    font-weight: bold;
    color:#008FF6;
    cursor:pointer;
    text-decoration:none;
    
    
`

var LeftMenu = styled.div`
    display:flex;
    width:50%;
    align-items: center;
    & > ul{
        display:flex;
    }
    & > ul >li{
            list-style:none;
            margin-right:40px;
    }

    & > ul >li >a{
        color:#7A90A8;
        text-decoration: none;
        font-size:.9em;
        font-family:'Prompt', sans-serif;
    }
`

var RightMenu = styled.div`
    width:50%;
    display:flex;
    justify-content: flex-end;
    & > ul{
        width:100%;
        padding:0;
        margin:0;
        display:flex;
        align-items: center;
        justify-content: flex-end;
    }

    & > ul > li{
        list-style:none;
        margin-left:30px;
        
    }


    & > ul > li > a{
        color:#7A90A8;
        text-decoration: none;
        font-size:.9em;
        font-family:'Prompt', sans-serif;
    }
`



class Navbar extends Component {
    render() {
        return (
            <NavbarOutside className={this.props.animationClassName}>
                <Wrapper>
                    <NavbarWrapper>

                        <LeftMenu>
                            <Logo a href="/">Tutor Finder</Logo>
                            <ul>
                                <li><a href="/search" data-cy="navFindTutor">หาติวเตอร์</a></li>
                            </ul>

                        </LeftMenu>
                        <RightMenu>
                            <ul>
                                <li><a href="/" data-cy="navLogin_btn">เข้าสู่ระบบ</a></li>
                                <li><a href="/signup">
                                    <ActiveButton width="146px">สมัครสมาชิก</ActiveButton>
                                </a></li>
                            </ul>
                        </RightMenu>
                    </NavbarWrapper>
                </Wrapper>

            </NavbarOutside>
        )
    }
}

export default Navbar