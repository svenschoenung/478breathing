import React, { useState } from 'react';
import { Link } from 'gatsby';
import Slider from 'react-rangeslider';
import { GithubPicker } from 'react-color';
import useInterval from '@use-it/interval';
import { useSSRLocalStorage } from '../use-ssr-local-storage';
import Page, { defaultTheme } from '../components/page'

const BREATH_IN = 0;
const BREATH_HOLD = 1;
const BREATH_OUT = 2;

const MAX_COUNT = {
  [BREATH_IN]: 4,
  [BREATH_HOLD]: 7,
  [BREATH_OUT]: 8
}

const INSTRUCTION = {
  [BREATH_IN]: 'Breathe in', 
  [BREATH_HOLD]: 'Hold your breath', 
  [BREATH_OUT]: 'Breathe out', 
}

export default () => {
  const [millis, setMillis] = useState(0);
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [size, setSize] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [theme, setTheme] = useSSRLocalStorage('theme', defaultTheme);
  const [delay, setDelay] = useSSRLocalStorage('delay', 1200);

  const fadeOutDelay = 10

  useInterval(() => {
    if (stage !== null) {
      let newMillis = millis + fadeOutDelay
      let newCount = count
      let newStage = stage

      if (newMillis > delay) {
        newMillis = newMillis % delay
        newCount = (count + 1) % MAX_COUNT[stage]
        newStage = newCount === 0 ? (stage + 1) % 3 : stage 
      }

      setCount(newCount)
      setStage(newStage)
      setMillis(newMillis)

      const percent = newCount / MAX_COUNT[newStage] + (1 / MAX_COUNT[newStage]) * (newMillis / delay)

      setOpacity(
        newStage === BREATH_IN ? 0.2 + percent * 0.8 :
        newStage === BREATH_OUT ? 1 - percent * 0.9 : 1
      )
      setSize(
        newStage === BREATH_IN ? Math.min(40, 22 + 20 * percent) :
        newStage === BREATH_OUT ? Math.min(40, 41 - 20 * percent) : 40
      )
    }
  }, stage !== null ? fadeOutDelay : null);

  const start = () => {
    setMillis(0)
    setCount(0)
    setSize(0)
    setStage(BREATH_IN)
  }

  const stop = () => {
    setStage(null)
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions)
    setShowPicker(false)
  }

  const changeTheme = (color) => {
    setTheme(color.hex.toUpperCase())
  }

  const changeDelay = (value) => {
    setDelay(2000 - value)
  }

  const togglePicker = () => {
    setShowPicker(!showPicker)
  }

  return <Page title="4-7-8 Breathing">
    <div className="space"/>
    {stage === null ?
      <div>
        <h1>4-7-8 Breathing</h1>
        <button onClick={start} aria-label="Start">
          <svg viewBox="0 0 512 512" width="30vh">
            <path fill="#ffffff" d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"
              strokeMiterlimit="10"></path>
          </svg>
        </button>
      </div>
      :
      <div className="counter">
        <div className="count" style={{opacity, fontSize: `${size}vh`}}>{count + 1}</div>
        <div className="instruction" style={{opacity}}>{INSTRUCTION[stage]}</div>
        <div className="stop">
        <button onClick={stop} aria-label="Stop">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 512 512" width="7vh">
            <path fill="#ffffff" d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z"></path>
          </svg>
        </button>
        </div>
      </div>
    }
    <div className="space"/>
    <div className="footer">
      <Link to="/about" aria-label="About">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 512 512">
          <path fill="#ffffff" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
        </svg>
      </Link>
      <div className="space"/>
      {showOptions &&
        <div className="options">
          <div>
            <button className="color" style={{background: theme}} onClick={togglePicker}></button>
            { showPicker &&
              <div className="color-popup">
                { /* eslint-disable-next-line */}
                <div className="cover" onClick={togglePicker}/>
                <GithubPicker 
                  color={theme}
                  onChange={changeTheme}
                  triangle="hide"/>
              </div>
            }
          </div>
          <Slider
            min={0}
            max={1500}
            step={10}
            value={2000 - delay}
            tooltip={false}
            onChange={(newDelay) => changeDelay(newDelay)}
          />
        </div>
      }
      <button onClick={toggleOptions} aria-label="Settings">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 512 512">
        <path fill="#ffffff" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
          strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
    </div>
  </Page>
}
