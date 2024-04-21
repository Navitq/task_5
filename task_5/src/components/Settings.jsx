import React, { useState, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import seedrandom from 'seedrandom';
import { faker, Randomizer } from '@faker-js/faker';

import { ru, fakerRU } from '@faker-js/faker';
import { en_GB, fakerEN_GB } from '@faker-js/faker';
import { pl, fakerPL } from '@faker-js/faker';
import i18next from 'i18next';
import { v5 as uuidv5 } from 'uuid';




export function  Settings(props) {
    let seedGenerator = seedrandom();
    let [rangeAmountErr,setRangeAmountErr] = useState(0);
    let [currentRecPage,setCurrentRecPage] = useState(0);
    let [inptAmountErr,setInptAmountErr] = useState(0);
    let [seed,setSeed] = useState(1234);

    let uuidNameSpace = '1b671a64-40d5-491e-99b0-da01ff1f3341';

    let seedRef = useRef(0);
    createNewRec()
    function newFackerSeed(){
        setCurrentRecPage(0)
        createNewRec()
    }

    function defFackerReg(){
        if(i18next.resolvedLanguage == "ru"){
            return fakerRU;
        } else if (i18next.resolvedLanguage == "pl"){
            return fakerPL;
        } else {
            return fakerEN_GB;
        }
    }

    function createNewRec(){
        let fakerReg = defFackerReg();
        let seedNumber = Number(seed + currentRecPage.toString());
        fakerReg.seed(seedNumber+1)
        let fakeData = []
        for (let i = 0; i < 20; i++) {
            console.log(uuidv5(toString(i+currentRecPage*10)+seed,uuidNameSpace))
            let town = seed%2==0?fakerReg.location.city():fakerReg.location.country() + ",";
            let streetName = fakerReg.location.street() + " ";
            let streetNumber = fakerReg.location.streetAddress()+" ";
            let telephone = fakerReg.phone.number();
            fakeData.push([i+currentRecPage*10, uuidv5(toString(i+currentRecPage*10)+seed,uuidNameSpace), fakerReg.person.fullName(),town + streetName + streetNumber, telephone])
        }
        //setCurrentRecPage(currentRecPage+1)
        console.log(fakeData)
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

    function createNewSeed(e){
        setSeed(seedGenerator.int32())
    }
    
    function changeSeed(e){
        setSeed(e.target.value)
        newFackerSeed()
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
                    <Form.Control type="number" ref={seedRef} onChange={changeSeed} value={seed} ></Form.Control>
                    <Button className='mt-4' onClick={createNewSeed}>Random</Button>
                </Container>
            </Container>
        </Container>
    )
}

