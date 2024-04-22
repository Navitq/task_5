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
    let errRef = useRef([0]);

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

    function createNewRec(localSeed = seedRef.current.value){
        let fakerReg = defFakerReg();

        let seedNumber = Number(localSeed + currentRecPage.current[0].toString());

        fakerReg.seed(seedNumber+1)
        let fakeData = []
        for (let i = 0; i < 20; i++) {
            let town = fakerReg.location.city() + ", ";
            let streetName = fakerReg.location.street() + " ";
            let streetNumber = fakerReg.location.streetAddress()+" ";
            let telephone = fakerReg.phone.number();
            fakeData.push([i+1+currentRecPage.current[0]*20, fakerReg.string.uuid(), fakerReg.person.fullName(),town + streetName + streetNumber, telephone])
        }

        fakeData = definedErr(fakeData, fakerReg);
        currentRecPage.current[0] = currentRecPage.current[0] +1;
        props.newTableData(fakeData,currentRecPage.current[0])
            
    }

    function createMistakes(el,errFull,faker){
        let values =  {max:99, min:0}
        for(let i =0;i<errFull;++i){
            let latterPos = faker.number.int({min:0});
            let replacementType = faker.number.int(values)%3;
            let latter = faker.string.alpha();
            let position = faker.number.int(values)%3;
            if(position==0){
                latterPos = latterPos%(el[2].length);
                let dataArray = el[2].split("");
                replacementType == 0?  dataArray.splice(latterPos-1,1):replacementType == 1? dataArray.splice(latterPos-1,1,latter):dataArray.splice(latterPos-1,0,latter)
                el[2] = dataArray.join("");
            } else if(position==1){
                latterPos = latterPos%(el[3].length);
                let dataArray = el[3].split("");
                replacementType == 0?  dataArray.splice(latterPos-1,1):replacementType == 1? dataArray.splice(latterPos-1,1,latter):dataArray.splice(latterPos-1,0,latter)
                el[3] = dataArray.join("");
            } else {
                latterPos = latterPos%(el[4].length);
                let dataArray = el[4].split("");
                replacementType == 0?  dataArray.splice(latterPos-1,1):replacementType == 1? dataArray.splice(latterPos-1,1,latter):dataArray.splice(latterPos-1,0,latter)
                el[4] = dataArray.join("");
            }
        }
        return el
    }


    function definedErr(fakeData, faker){
        let errAmnt = Math.trunc(errRef.current[0]);
        let changedData = fakeData.map((el,index)=>{
            let value =  (faker.number.int({
                max:99,
                min:0
            }));
            let errFull = value >  Math.trunc(Math.abs(Number(errRef.current[0])%1/0.25*0.25*100))? errAmnt:errAmnt+1;
            return createMistakes(el, errFull, faker);
        })
        return changedData;
    }

    
    function changeErrAmount(e){
        if(e.target.value <= 10){
            setInptAmountErr(e.target.value)
            setRangeAmountErr(e.target.value)
        } else {
            setRangeAmountErr(10)
            if(e.target.value>1000){
                e.target.value = 1000;
            }
            setInptAmountErr(e.target.value)
        }
        errRef.current[0] = e.target.value;
        currentRecPage.current[0] = 0;
        createNewRec()
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