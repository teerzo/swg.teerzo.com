
import { useState, useEffect } from 'react';
import Header from 'components/header'
import Footer from 'components/Footer'

export default function Expertise() {

    const [file, setFile] = useState(null);

    const [chat, setChat] = useState([]);
    const [combat, setCombat] = useState([]);

    const [players, setPlayers] = useState([]);

    const [npcs, setNPCS] = useState([
        'Krix Swiftshadow', 
        'Watch Captain Prat',
        'IT-0 Interrogator Droid',
        'Cmdr. Kenkirk',
        'the Clenched Fist of Hate',
        'Exar Kun',
        'Nandina',
        'Kimaru',
    ]);

   


    useEffect(() => {
        filterMessages(file);
    }, [file])

    useEffect(() => {
        initPlayers();
    }, [combat])


    function handleFileChange(e) {
        // console.log('handleFileChange', e);
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            const result = text.split(/\r?\n/);
            setFile(result);
        };
        reader.readAsText(e.target.files[0])

    }

    function filterMessages(msgs) {

        const typeChat = '[Chat]  ';
        const typeCombat = '[Combat]  ';
        const typeGroup = '[Group] ';

        const timeLength = 8;
        const attacksLength = 'attacks ';
        const hasCausedLength = 'has caused ';
        const usingLength = 'using ';
        const performsLength = 'performs ';

        if (msgs) {

            let _chat = [];
            let _combat = [];

            for (let i = 0; i < msgs.length; i++) {
                let str = msgs[i];
                let msg = {
                    type: '',
                    time: '',
                    msg: '',
                }

                // console.log('raw', str);

                if (str.indexOf(typeChat) !== -1) {
                    let typeIndex = str.indexOf(typeChat);
                    str = str.slice(typeIndex + typeChat.length);

                    msg.type = 'chat';
                    msg.time = str.slice(0, timeLength);
                    msg.msg = str.slice(timeLength);

                    _chat.push(msg);
                }
                else if (str.indexOf(typeCombat) !== -1) {

                    if ( true || str.indexOf(performsLength) !== -1) {
                        console.log('raw', str);
                        let typeIndex = str.indexOf(typeCombat);
                        str = str.slice(typeIndex + typeCombat.length);

                        msg.type = 'combat';
                        msg.time = str.slice(0, timeLength);

                        str = str.slice(timeLength + 1);

                        let attackIndex = str.indexOf(attacksLength);
                        let hasIndex = str.indexOf(hasCausedLength);
                        let performsIndex = str.indexOf(performsLength)

                        if (attackIndex !== -1) {
                            msg.fullName = str.slice(0, attackIndex - 1);
                            msg.msg = str.slice(attackIndex);
                        }
                        else if (hasIndex !== -1) {
                            let fullName = str.slice(0, hasIndex);
                            let lastNameIndex = fullName.indexOf(' ');
                            if (lastNameIndex !== -1) {
                                msg.firstName = fullName.slice(0, lastNameIndex);
                                msg.lastName = fullName.slice(lastNameIndex + 1);
                            }
                            else {
                                msg.firstName = fullName
                                msg.lastName = '';
                            }
                            msg.msg = str.slice(hasIndex);
                        }
                        else if (performsIndex !== -1) {
                            let fullName = str.slice(0, performsIndex);
                            let lastNameIndex = fullName.indexOf(' ');
                            if (lastNameIndex !== -1) {
                                msg.firstName = fullName.slice(0, lastNameIndex);
                                msg.lastName = fullName.slice(lastNameIndex + 1);
                            }
                            else {
                                msg.firstName = fullName
                                msg.lastName = '';
                            }
                            msg.msg = str.slice(performsIndex);
                        }

                        _combat.push(msg);
                    }
                }

            }
            setChat(_chat);
            setCombat(_combat);
        }
    }

    function initPlayers() {
        let _players = [...players];

        if (combat && combat.length > 0) {
            for (let i = 0; i < combat.length; i++) {
                // console.log('combat', combat[i]);
                let match = false;

                for (let n = 0; n < npcs.length; n++) {
                    
                    if( combat[i]?.fullName?.indexOf(npcs[n]) !== -1) {
                        console.log('npcs', npcs[n], combat[i].fullName, npcs[n].indexOf(combat[i].fullName));
                        match = true;
                    }


                    // if (npcs[n].indexOf(combat[i].firstName) !== -1) {
                    //     match = true;
                    // }
                }

                for (let p = 0; p < _players.length; p++) {
                    // console.log('match', combat[i].firstName, combat[i].lastName);
                    if (combat[i].firstName === _players[p].firstName) {
                        if (combat[i].lastName !== null) {
                            _players[p].lastName = combat[i].lastName;
                        }
                        match = true;
                    }
                }
                if (!match) {
                    let player = {
                        firstName: combat[i].firstName,
                        lastName: combat[i].lastName,
                        // profession: 'profession'
                    }

                    _players.push(player);
                }
            }

            console.log('players', _players);

            setPlayers(_players);
        }
    }

    return (
        <div className="container">
            <Header />
            <main>

                <h3> DPS </h3>

                <input type="file" onChange={handleFileChange} />


                <div className="dps">

                    <h3> Players </h3>
                    {players && players.length > 0 ?
                        players.map((item, key) => {
                            return <div key={key}> <b> {item.firstName} {item.lastName} </b> {item.profession} </div>
                        })
                        : <div> No players </div>
                    }

                    <h3> Chat </h3>
                    {chat && chat.length > 0 ?
                        chat.map((item, key) => {
                            return <div key={key}> [Chat] - {item.time} - {item.msg} </div>
                        })
                        : <div> No chat </div>
                    }



                    <h3> Combat </h3>
                    {combat && combat.length > 0 ?
                        combat.map((item, key) => {
                            if( item.fullName) {
                                return <div key={key}> <b >{item.time}</b>: <b> {item.fullName} </b> {item.msg} </div>

                            }
                            else {
                                return <div key={key}> <b>{item.time}</b>: <b> {item.firstName} {item.lastName} </b> {item.msg} </div>

                            }
                        })
                        : <div> No combat </div>
                    }

                </div>
            </main>
            <Footer />
        </div>
    )
}
