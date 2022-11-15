import { useState, useEffect, useRef } from "react"
import Head from "next/head"
import axios from 'axios'
import styles from "../styles/Home.module.css"

import { HiBars3 } from 'react-icons/hi2'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { resolve } from "styled-jsx/css"

export default function Portfolio() {
	const [ showNavbar, setShowNavbar ] = useState(true)
	const [ openNavbar, setOpenNavbar ] = useState(false)
	const navbar = useRef()
	const video = useRef()
	const aboutMe = useRef()
	const skill = useRef()
	const showcase = useRef()
	const contract = useRef()
	const skillNav = useRef()
	const skillDetails = useRef()

	useEffect(()=> {
		// video.current.play()
		let videoState = 'red'
		const changeVideoHandle = () => {
			if(videoState === 'red'){
				video.current.src = 'ink_drop_blue.mp4'
				videoState = 'blue'
			} else {
				video.current.src = 'ink_drop_red.mp4'
				videoState = 'red'
			}
		}
		video.current.addEventListener('ended', changeVideoHandle)

		var previousY = 0
		window.onscroll = function() {
			// window.pageYOffset >= window.innerHeight/1.25
			var currentY = window.pageYOffset
			if(currentY < previousY){
				setShowNavbar(p => false)
			} else {
				setShowNavbar(p => true)
				setOpenNavbar(p => false)
			}
			previousY = window.pageYOffset
		}
	}, [])

	const navbarDropdownHandle = () => {
		setOpenNavbar(p => !p)
	}

	const navigateHandle = (e) => {
		const target = e.target.id
		switch(target){
			case 'aboutMe': aboutMe.current.scrollIntoView({behavior: "smooth"})
				break
			case 'skill': skill.current.scrollIntoView({behavior: "smooth"})
				break
			case 'showcase': showcase.current.scrollIntoView({behavior: "smooth"})
				break
			case 'contract': contract.current.scrollIntoView({behavior: "smooth"})
				break
			default: aboutMe.current.scrollIntoView({behavior: "smooth"})			
		}
	}

	const changeSkill = (e) => {
		const target = e.target.id
		const progressState = document.getElementsByClassName(styles.progressState)
		const transition = 'all 0.6s'
		const delay = '0.3s'
		
		const reset = () => {
			for(let i=0; i<progressState.length; i++){
				// progressState[i].style.transitionDelay = '0s'
				// progressState[i].style.transition = 'none'
				progressState[i].style.width = '0%'
			}
			for(let i=0; i<skillNav.current.children.length; i++){
				skillNav.current.children[i].classList.remove(styles.active)
			}
		}
		const removeTransition = () => {
			for(let i=0; i<progressState.length; i++){
				progressState[i].style.transitionDelay = '0s'
				// progressState[i].style.transition = 'none'
			}
		}
		const animation = async (data) => {
			reset()
			data.forEach( element => {
				progressState[element.index].style.transition = transition
				progressState[element.index].style.transitionDelay = delay
				progressState[element.index].style.width = element.value
			})
			await new Promise((resolve, reject) => setTimeout(() => {
				removeTransition()
				resolve()
			}, 1500))
		}
		if(target === 'frontend'){
			let skillData = [
				{index: 0, value: '90%'},
				{index: 1, value: '85%'}
			]
			skillDetails.current.style.transform = 'translateX(0%)'
			animation(skillData)
			skillNav.current.children[0].classList.add(styles.active)
		}
		else if(target === 'backend') {
			let skillData = [
				{index: 2, value: '95%'},
				{index: 3, value: '80%'},
				{index: 4, value: '90%'},
				{index: 5, value: '40%'}
			]
			skillDetails.current.style.transform = 'translateX(-100%)'
			animation(skillData)
			skillNav.current.children[1].classList.add(styles.active)
		}
		else if(target === 'database') {
			let skillData = [
				{index: 6, value: '80%'},
				{index: 7, value: '90%'},
				{index: 8, value: '35%'},
			]
			skillDetails.current.style.transform = 'translateX(-200%)'
			animation(skillData)
			skillNav.current.children[2].classList.add(styles.active)
		}
	}

	const mailSubmit = (e) => {
		e.preventDefault()
		axios.post('/api/sendMail', {
			name: e.target.name.value,
			email: e.target.email.value,
			message: e.target.message.value
		}).then(async result => {
			e.target.name.value = ''
			e.target.email.value = ''
			e.target.message.value = ''
			document.getElementById('email-success').classList.add(styles.show)
			await new Promise((resolve, reject) => setTimeout(() => {
				document.getElementById('email-success').classList.remove(styles.show)
				resolve()
			}, 3000))
		}).catch(async err => {
			document.getElementById('email-fail').classList.add(styles.show)
			await new Promise((resolve, reject) => setTimeout(() => {
				document.getElementById('email-fail').classList.remove(styles.show)
				resolve()
			}, 3000))
		})
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Portfolio</title>
				<meta name="description" content="Patrapong's portfolio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div ref={navbar} className={`${styles.navbar} ${showNavbar? styles.moveUp:''}`}>
				<div className={styles.navToggle}>
					<div className={styles.toggleBtn} onClick={navbarDropdownHandle}><HiBars3 /></div>
				</div>
				<div className={`${styles.navWrap} ${openNavbar? styles.show:''}`} onClick={navigateHandle}>
					<div id='aboutMe' className={styles.navItem}>About me</div>
					<div id='skill' className={styles.navItem}>Skill</div>
					<div id='showcase' className={styles.navItem}>Showcase</div>
					<div id='contract' className={styles.navItem}>Contract me</div>
				</div>
			</div>
			<main className={styles.main}>
				<div className={styles.welcomeSection}>
					<div className={styles.videoBackground}>
						<video ref={video} autoPlay muted playsInline id="myVideo" className={styles.video}>
							<source src="ink_drop_red.mp4" type="video/mp4"/>   
						</video>
					</div>
					<div>Hello I'm</div>
					<div>Patrapong</div>
					<div className={styles.bottom} onClick={navigateHandle}>
						<div className={styles.scrollDown}></div>
						<div className={styles.label}>scroll down</div>
					</div>
				</div>
				<div ref={aboutMe} className={styles.section}>
					<div className={styles.title}>About me</div>
					<div className={styles.aboutMe}>
						<img className={styles.img} src='profile-removebg.png'/>
						<div className={styles.information}>
							<div>Hello. I'm Patrapong Pakmaruek</div>
							<div></div>
							<div>I'm Engineering electronic computer. I'm study at <a href='https://www.kmutnb.ac.th/' target='_blank'>King Mongkut's University of Technology North Bangkok</a> in <a href='https://cit.kmutnb.ac.th/new/' target='_blank'>College of Industrial Technology</a>. GPA 3.79</div>
							<div>I enjoy doing backend develop and design database</div>
						</div>
					</div>
				</div>
				<div ref={skill} className={styles.section}>
					<div className={styles.title}>My skill</div>
					<div className={styles.mySkill}>
						<div className={styles.skillLabel}>
							{/* <div id='frontend-label'>Ea esse dolor ullamco ad enim quis deserunt eiusmod tempor fugiat consectetur voluptate exercitation.</div>
							<div id='backend-label'>Ea culpa esse ut cillum sunt et cupidatat veniam cillum sint.</div>
							<div id='database-label'>Irure commodo nulla excepteur magna.</div> */}
							<div>I'm expert in Java and NodeJS. I've been working on a database for simulated cryptocurrency trading websites using PHP and MySql, bookstore using React NodeJS and MongoDB.</div>
						</div>
						<div className={styles.skillControls}>
							<div ref={skillNav} className={styles.skillNav} onClick={changeSkill}>
								<div id='frontend' className={`${styles.skillNavItem} ${styles.active}`}>Frontend</div> |
								<div id='backend' className={styles.skillNavItem}>Backend</div> |
								<div id='database' className={styles.skillNavItem}>Database</div>
							</div>
							<div className={styles.skillContainer}>
								<div ref={skillDetails} className={styles.skillDetails}>
									<div id='frontend-details' className={styles.skillGroup}>
										<div className={styles.progressContainer}>
											<div className={styles.progressTitle}>HTML CSS</div>
											<div className={styles.progressBar}>
												<div className={styles.progressState} style={{width: '90%'}}></div>
											</div>
										</div>
										<div className={styles.progressContainer}>
											<div className={styles.progressTitle}>React (Next.js)</div>
											<div className={styles.progressBar}>
												<div className={styles.progressState} style={{width: '85%'}}></div>
											</div>
										</div>
									</div>
									<div id='backend-details' className={styles.skillGroup}>
										<div className={styles.progressContainer}>
											<div className={styles.progressTitle}>Node.js</div>
											<div className={styles.progressBar}>
												<div className={styles.progressState} ></div>
											</div>
										</div>
										<div className={styles.progressContainer}>
											<div className={styles.progressTitle}>PHP</div>
											<div className={styles.progressBar}>
												<div className={styles.progressState} ></div>
											</div>
										</div>
										<div className={styles.progressContainer}>
											<div className={styles.progressTitle}>Java</div>
											<div className={styles.progressBar}>
												<div className={styles.progressState} ></div>
											</div>
										</div>
										<div className={styles.progressContainer}>
											<div className={styles.progressTitle}>Python</div>
											<div className={styles.progressBar}>
												<div className={styles.progressState} ></div>
											</div>
										</div>
									</div>
									<div id='database-details' className={styles.skillGroup}>
										<div className={styles.progressContainer}>
											<div className={styles.progressTitle}>MySql</div>
											<div className={styles.progressBar}>
												<div className={styles.progressState} ></div>
											</div>
										</div>
										<div className={styles.progressContainer}>
											<div className={styles.progressTitle}>MongoDB</div>
											<div className={styles.progressBar}>
												<div className={styles.progressState} ></div>
											</div>
										</div>
										<div className={styles.progressContainer}>
											<div className={styles.progressTitle}>Firebase</div>
											<div className={styles.progressBar}>
												<div className={styles.progressState}></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div ref={showcase} className={styles.section}>
					<div className={styles.title}>Showcase</div>
					<div className={styles.cardContainer}>
						<div className={styles.card}>
							<img className={styles.cardImg} src="/showcase1.png"/>
							<div className={styles.btnGroup}>
								<a href='https://github.com/Shinoo17/BitMeta' target='_target' className={styles.btn_sc}>Github</a>
							</div>
						</div>
						<div className={styles.card}>
							<img className={styles.cardImg} src="/showcase2.png"/>
							<div className={styles.btnGroup}>
								<a href='https://github.com/Shinoo170/frontend' target='_target' className={styles.btn_sc}>Github</a>
								<a href='https://frontend-shinoo170.vercel.app/' target='_target' className={styles.btn_sc}>Live demo</a>
							</div>
						</div>
					</div>
				</div>
				<div ref={contract} className={styles.section} style={{backgroundColor: 'transparent'}}>
					<div className={styles.title}>Contract me</div>
					<div className={styles.contract}>
						<div className={styles.contractDetails}>
							<div>Facebook : Patrapong Pakmaruek</div>
							<div>Github : Shinoo170</div>
							<div>Email : patrapong17@gmail.com</div>
							<div>Tel : 082-188-6593</div>
							<div className={styles.iconGroup}>
								<a href='https://www.facebook.com/patrapong17/' target='_blank'><FaFacebook /></a>
								<a href='https://github.com/shinoo170' target='_blank'><FaGithub /></a>
							</div>
						</div>
						<form className={styles.input} onSubmit={e => mailSubmit(e)}>
							<input id='name' placeholder='Name' required/>
							<input id='email' type='email' placeholder='Email' required/>
							<textarea id='message' placeholder='Message' required/>
							<button className={styles.btn}>Submit</button>
							<div id='email-success' className={styles.alert_green}>* send email success</div>
							<div id='email-fail' className={styles.alert_red}>* cannot send email</div>
						</form>
					</div>
				</div>
			</main>
			<footer className={styles.footer}>
				<div>© Patrapong Pakmaruek 2022</div>
			</footer>
		</div>
	)
}
