import { useState, useEffect } from 'react';

import Header from 'components/header'
import Footer from 'components/Footer'
import Link from 'components/common/link';
import Image from 'next/image';

import PageButton from 'components/common/page-button';




// Styles
import styles from './officer.module.scss';

// Images
import skillBoxOutline from 'public/skillbox.jpg';

import imgR1C1 from 'public/officer/sturdiness.gif';
import imgR1C3 from 'public/officer/marksmanship.gif';
import imgR1C5 from 'public/officer/toughness.gif';
import imgR1C7 from 'public/officer/endurance.gif';

import imgR2C1 from 'public/officer/closecombat.gif';
import imgR2C3 from 'public/officer/sidearmaccuracy.gif';
import imgR2C5 from 'public/officer/kineticdefense.gif';
import imgR2C7 from 'public/officer/energydefense.gif';

import imgR3C1 from 'public/officer/closecombat.gif';
import imgR3C3 from 'public/officer/sidearmaccuracy.gif';

import imgR4C1 from 'public/officer/decapitate.gif';
import imgR4C2 from 'public/officer/decapitate.gif';
import imgR4C3 from 'public/officer/overcharge.gif';
import imgR4C5 from 'public/officer/synapticstimulator.gif';
import imgR4C7 from 'public/officer/environmentalpurge.gif';

import imgR5C1 from 'public/officer/cripplingvortex.gif';
import imgR5C3 from 'public/officer/calledshot.gif';
import imgR5C5 from 'public/officer/bactaflush.gif';
import imgR5C6 from 'public/officer/bactaflush.gif';
import imgR5C7 from 'public/officer/bactaflush.gif';

import imgLeft from 'public/expertise/bg-expertise-left.png';
import imgOfficer from 'public/expertise/bg-expertise-officer.png';
import imgBM from 'public/expertise/bg-expertise-bm.png';
import imgRight from 'public/expertise/bg-expertise-right.png';


export default function Officer() {

    const totalPoints = 45;
    const [points, setPoints] = useState(0);

    const [tab, setTab] = useState('officer-1');

    const [selected, setSelected] = useState(null);

    const [officer1, setOfficer] = useState([
        // Row 1
        { id: 'r1c1', image: imgR1C1, row: 1, col: 1, count: 0, max: 4, required: 0, name: 'Sturdiness', description: 'A permanant increase in Strength' },
        { id: 'r1c3', image: imgR1C3, row: 1, col: 3, count: 0, max: 4, required: 0, name: 'Marksmanship', description: 'A permanant increase in Strength' },
        { id: 'r1c5', image: imgR1C5, row: 1, col: 5, count: 0, max: 4, required: 0, name: 'Toughness', description: 'A permanant increase in Strength' },
        { id: 'r1c7', image: imgR1C7, row: 1, col: 7, count: 0, max: 4, required: 0, name: 'Endurance', description: 'A permanant increase in Strength' },

        // Row 2
        { id: 'r2c1', image: imgR2C1, row: 2, col: 1, count: 0, max: 4, required: 4, name: 'Close Combat', description: 'Blah blah blah' },
        { id: 'r2c3', image: imgR2C3, row: 2, col: 3, count: 0, max: 4, required: 4, name: 'Close Combat', description: 'Blah blah blah' },
    ])


    // useEffect(() => {

    // },[])


    function handleTabClick(event) {
        console.log('handleTabClick', event?.target?.id);

        setTab(event?.target?.id);
    }

    function handleSelect(event) {
        const id = event.target.id;
        console.log('handleSelect', id);
        const _officer = [...officer1];

        let _selected = null;
        for (let i = 0; i < _officer.length; i++) {
            if (id === _officer[i].id) {

                _selected = _officer[i];
            }
        }
        setSelected(_selected);
    }

    function handleLeftClick(event) {

        const id = event.target.id;
        const _officer = [...officer1];
        console.log('handleLeftClick', _officer);
        let _points = points;

        for (let i = 0; i < _officer.length; i++) {
            if (id === _officer[i].id) {
                console.log('points', points, _officer[i].required);
                if (points >= _officer[i].required) {
                    if (_officer[i].count < _officer[i].max) {
                        _officer[i].count += 1;
                        _points += 1;
                    }
                }
            }
        }
        setOfficer(_officer);
        if (_points !== points) {
            setPoints(_points);
        }
    }
    function handleRightClick(event) {

        const id = event.target.id;
        console.log('handleRightClick', id);
        const _officer = [...officer1];
        let _points = points;

        for (let i = 0; i < _officer.length; i++) {
            if (_officer[i].count > 0) {
                if (id === _officer[i].id) {
                    _officer[i].count -= 1;
                    _points += 1;
                }
            }
        }
        setOfficer(_officer);
        if (_points !== points) {
            setPoints(_points);
        }
    }

    return (
        <div className="container">
            <Header />
            <main className={styles.officer}>

                <div className={styles.background}>
                    <div className={styles.tabs}>
                        <button id="officer-1" onClick={handleTabClick} className={tab === 'officer-1' ? styles.selected : ''}> OFFICER SPECIALIZATION </button>
                        <button id="officer-2" onClick={handleTabClick} className={tab === 'officer-2' ? styles.selected : ''}> SQUAD COMMAND </button>
                        <button id="officer-3" onClick={handleTabClick} className={tab === 'officer-3' ? styles.selected : ''}> BEAST MASTERY </button>
                    </div>

                    <div className={styles.panels}>
                        <div className={`${styles.panel} ${tab === 'officer-1' ? styles.show : ''} `} style={{  backgroundImage: `url(${imgLeft?.src})`}}>
                            <div className={styles.grid}>

                                {officer1.map((item, key) => {
                                    return (
                                        <SkillBox id={item.id} key={key} onSelect={handleSelect} onLeftClick={handleLeftClick} onRightClick={handleRightClick} {...item} />
                                    )
                                })}

                                {/* ROW 1 */}
                                {/* <SkillBox image={imgR1C1} row={1} col={1} count={0} max={4} name="Sturdiness" /> */}
                                {/* <SkillBox image={imgR1C3} row={1} col={3} name="Marksmanship" /> */}
                                {/* <SkillBox image={imgR1C5} row={1} col={5} name="Toughness" /> */}
                                {/* <SkillBox image={imgR1C7} row={1} col={7} name="Endurance" /> */}

                                {/* ROW 2 */}
                                {/* <SkillBox image={imgR2C1} row={2} col={1} name="Close Combat" /> */}
                                {/* <SkillBox image={imgR2C3} row={2} col={3} name="Side Arm Accuracy" /> */}
                                {/* <SkillBox image={imgR2C5} row={2} col={5} name="Energy Defense" /> */}
                                {/* <SkillBox image={imgR2C7} row={2} col={7} name="Kinetic Defense" /> */}

                                {/* ROW 3 */}
                                {/* <SkillBox image={imgR3C1} row={3} col={1} name="Grim Blows" /> */}
                                {/* <SkillBox image={imgR3C3} row={3} col={3} name="Dire Strikes" /> */}

                                {/* ROW 4 */}
                                {/* <SkillBox image={imgR4C1} row={4} col={1} name="Decapitate" /> */}
                                {/* <SkillBox image={imgR4C2} row={4} col={2} name="Leg Strike" /> */}
                                {/* <SkillBox image={imgR4C3} row={4} col={3} name="Overcharge" /> */}
                                {/* <SkillBox image={imgR4C5} row={4} col={5} name="Synaptic Stimulator" /> */}
                                {/* <SkillBox image={imgR4C7} row={4} col={7} name="Environmental Purge" /> */}

                                {/* ROW 5 */}
                                {/* <SkillBox image={imgR5C1} row={5} col={1} name="Crippling Vortex" /> */}
                                {/* <SkillBox image={imgR5C3} row={5} col={3} name="Called Shot" /> */}
                                {/* <SkillBox image={imgR5C5} row={5} col={5} name="Bacta Flush" /> */}
                                {/* <SkillBox image={imgR5C6} row={5} col={6} name="Emergency Shield" /> */}
                                {/* <SkillBox image={imgR5C7} row={5} col={7} name="Automated Diagnosis" /> */}

                            </div>

                        </div>
                        <div className={`${styles.panel} ${tab === 'officer-2' ? styles.show : ''} `} style={{  backgroundImage: `url(${imgOfficer?.src})`}}>

                            <div className={styles.grid}>
                                <SkillBox image={imgR1C1} row={1} col={1} name="Sturdiness" />

                            </div>

                        </div>
                        <div className={`${styles.panel} ${tab === 'officer-3' ? styles.show : ''} `} style={{  backgroundImage: `url(${imgBM?.src})`}}>

                            <div className={styles.grid}>
                                <SkillBox image={imgR1C1} row={1} col={1} name="Sturdiness" />

                            </div>
                        </div>
                        <div className={styles.info} style={{  backgroundImage: `url(${imgRight?.src})`}}>
                            {selected ?
                                <>

                                    <div className={styles['selected']}>
                                        <Image
                                            alt={'test'}
                                            src={selected.image}

                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                            }}
                                        />

                                        <h3> {selected.name} </h3>


                                    </div>
                                    <p> {selected?.description} </p>
                                </>
                                : null
                            }

                            <div className={styles['grow']}> </div>

                            <div className={styles.bottom}>
                                <p> Points available: {totalPoints - points}/{totalPoints} </p>


                            </div>
                        </div>
                    </div>
                </div>

            </main >
            <Footer />
        </div >
    )
}



function SkillBox({ name, image, count, max = 1, col, row, children, ...props }) {


    function onSelect(event) {

        if (props.onSelect) {
            props.onSelect(event);
        }
    }

    function onLeftClick(event) {
        console.log('onClick', event.button);

        if (props.onLeftClick) {
            props.onLeftClick(event);
        }

        if (props.onSelect) {
            props.onSelect(event);
        }
    }

    function onRightClick(event) {
        console.log('onClick', event.button);

        event.preventDefault();
        if (props.onRightClick) {
            props.onRightClick(event);
        }
    }

    return (
        <div className={`${styles.box} ${styles[name]}`} style={{
            opacity: count > 0 ? 1.0 : 0.3,
            backgroundImage: `url(${skillBoxOutline.src})`,
            gridColumnStart: col,
            gridRowStart: row,
        }}>
            <Image
                id={props.id}
                onClick={onLeftClick}
                // onLeftClick={onLeftClick}
                onContextMenu={onRightClick}

                alt={name}
                src={image}

                style={{
                    opacity: count > 0 ? 1.0 : 0.3,
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />
            <span> {name} </span>
            {count > 0 ?
                <div className={styles['points']}> {count} </div>
                : null
            }
            {children}
        </div>
    )
}