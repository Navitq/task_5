import React, { useState, useRef, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import seedrandom from 'seedrandom';
import { faker, Randomizer } from '@faker-js/faker';

import { ru, fakerRU } from '@faker-js/faker';
import { en_GB, fakerEN_GB } from '@faker-js/faker';
import { pl, fakerPL } from '@faker-js/faker';
import i18next from 'i18next';




function Settings(props) {
    let currentRecPage = useRef([0]);

    let seedGenerator = seedrandom();
    let [rangeAmountErr,setRangeAmountErr] = useState(0);
    let [inptAmountErr,setInptAmountErr] = useState(0);
    let [seed,setSeed] = useState(seedGenerator.int32());


    let seedRef = useRef(0);

    useEffect(() => {
        document.addEventListener("scroll",scrooll)
        createNewRec();
        return function() {
            document.removeEventListener("scroll",scrooll)
        }
    }, [])

    function defFakerReg(){
        if(i18next.resolvedLanguage == "ru"){
            return fakerRU;
        } else if (i18next.resolvedLanguage == "pl"){
            return fakerPL;
        } else {
            return fakerEN_GB;
        }
    }

    function scrooll(e){
        if(e.target.documentElement.scrollHeight -(e.target.documentElement.scrollTop + window.innerHeight) < 150){
            createNewRec()
        }

    }

    function createNewRec(localSeed = seed){
        console.log(currentRecPage.current)
        let fakerReg = defFakerReg();

        let seedNumber = Number(localSeed + currentRecPage.current[0].toString());

        fakerReg.seed(seedNumber+1)
        let fakeData = []
        for (let i = 0; i < 20; i++) {
            let town = fakerReg.location.city() + ", ";
            let streetName = fakerReg.location.street() + " ";
            let streetNumber = fakerReg.location.streetAddress()+" ";
            let telephone = fakerReg.phone.number();
            fakeData.push([i+1+currentRecPage.current[0]*20, faker.string.uuid(), fakerReg.person.fullName(),town + streetName + streetNumber, telephone])
        }

        fakeData = createMistakes(fakeData);
        currentRecPage.current[0] = currentRecPage.current[0] +1;
        props.newTableData(fakeData,currentRecPage.current[0])
            
    }


    function createMistakes(fakeData){
        
        return fakeData;
    }

    
    function changeErrAmount(e){
        if(e.target.value < 10){
            setRangeAmountErr(e.target.value)
            setInptAmountErr(e.target.value)
        } else {
            setRangeAmountErr(10)
            if(e.target.value>1000){
                e.target.value = 1000;
            }
            setInptAmountErr(e.target.value)
        }
    }

    function fixValue(e){
        e.target.value = Math.floor(e.target.value ) + Math.floor((e.target.value%1)/0.25)*0.25
        changeErrAmount(e);
    }

    function changeNewSeed(e){
        currentRecPage.current[0] = 0;
        console.log(seed)
        setSeed(e.target.value)
        createNewRec(e.target.value)
    }

    function createNewSeed(){
        let localSeed = seedGenerator.int32();
        currentRecPage.current[0] = 0;
        setSeed(localSeed)
        createNewRec(localSeed)
    }



    return (
        <Container className='mt-5'>
            
            <Container>
                <Container className='mb-3 text-center'>
                    <Form.Label className='h2 mb-3'>{props.t("main.mistakesDescr")}</Form.Label>
                    <Form.Range name='' min="0" max="10" step={0.25} value={rangeAmountErr} onChange={changeErrAmount}/>
                </Container>
                <Container>
                    <Form.Control
                                    type="number"
                                    min="0" 
                                    max="1000" 
                                    step={0.25}
                                    value={inptAmountErr}
                                    title="Choose your color"
                                    onBlur={fixValue}
                                    onChange={changeErrAmount}
                                />
                </Container>
                <Container className='my-4'>
                    <Form.Control type="number" ref={seedRef} onChange={changeNewSeed} value={seed} ></Form.Control>
                    <Button name="seedController" className='mt-4' onClick={createNewSeed}>Random</Button>
                </Container>
            </Container>
        </Container>
    )
}

export default Settings