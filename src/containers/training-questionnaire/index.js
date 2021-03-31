import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, useParams } from 'react-router-dom'
import { Grid, Header, Image } from 'semantic-ui-react'
import { FormGenerator } from 'cb-react-forms'

import clientDetailDuck from '@reducers/client/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import authDuck from '@reducers/auth'
import './styles.scss'

const TrainingForm = props => {
  const {
    clientDetail,
    currentTenant } = props
  const { clientId : clientId } = useParams()

  // step 1 form
  let data1 = [
    { id: '5a595144-3290-4125-9690-cd56d5cddd07',element: 'Label',label: { blocks: [ { key: '2otp1',text: 'Step 1 - Client and Pet Information',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 35,style: 'BOLD' } ],entityRanges: [],data: {} } ],entityMap: {} }
    },
    { id: 'a10ce32f-2803-4ec1-a878-7fe00898591d', element: 'TextInput', required: true, label: { blocks: [ { key: '22a98',text: 'Name',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ], entityMap: {} }, value: ''
    },
    { id: '3e961b09-3da2-4b68-b415-be9e93faea32',element: 'Email',required: true,label: { blocks: [ { key: '2jfc9',text: 'Email',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '0897110e-eb80-4308-966c-84fdf34b2409',element: 'NumberInput',required: true,label: { blocks: [ { key: '7i8vb',text: 'Phone Number',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: 0
    },
    { id: 'e89f28cd-4101-427c-8e0b-ecda8712e529',element: 'LineBreak' },{ id: 'f19fa957-2439-4220-bd8b-b7e7db790fe6',element: 'Header',label: { blocks: [ { key: 'aqv9t',text: 'Pet Information',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} }
    },
    { id: 'b1cc5a09-b053-4d15-9cd7-dcff440afb8c',element: 'TextInput',required: true,label: { blocks: [ { key: '410q7',text: 'Pet Name',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '0d95a3fe-f271-4c39-8d3e-68411ae061ce',element: 'TextInput',required: true,label: { blocks: [ { key: '7i8i3',text: 'Pet Breed',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '5254e60d-195f-43e2-bf35-6c06f1fd9b64',element: 'TextInput',required: false,label: { blocks: [ { key: '71cl1',text: 'Where did you get your Pet?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '67bb9659-7a9c-469e-87ee-64e2f4b1c473',element: 'TextInput',required: false,label: { blocks: [ { key: '4ij6o',text: 'How long has your pet lived with you?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '60e2765e-c8ba-45dc-a0ad-41b1fb46d06f',element: 'TextArea',required: false,label: { blocks: [ { key: '8frjm',text: 'Does your pet have any allergies or health related issues? if so, explain.',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '5eeaaf01-5125-48cc-b84f-5fdb71b67415',element: 'NumberInput',required: true,label: { blocks: [ { key: '1s36v',text: 'Approximate Age',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: 0
    }
  ]

  // step 2 form
  let data2 = [
    { id: '4498cf48-2837-4299-b631-ca679b31f327',element: 'Label',label: { blocks: [ { key: '6h5s2',text: 'Step 2 - Training Information',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 29,style: 'BOLD' } ],entityRanges: [],data: {} } ],entityMap: {} }
    },
    { id: 'a39488c2-4a3e-4d04-9c72-5d8f8b73afbb',element: 'Label',label: { blocks: [ { key: '2c0qm',text: '',type: 'header-three',depth: 0,inlineStyleRanges: [],entityRanges: [],data: { 'text-align': 'left' } },{ key: '3uf97',text: 'Training Questions',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 18,style: 'color-rgb(33,37,41)' },{ offset: 0,length: 18,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 18,style: 'fontsize-1.75rem' },{ offset: 0,length: 18,style: 'fontfamily-Lato, "Helvetica Neue", Arial, Helvetica, sans-serif' },{ offset: 0,length: 18,style: 'bgcolor-transparent' },{ offset: 0,length: 18,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 18,style: 'fontsize-18' } ],entityRanges: [],data: { 'text-align': 'left' } },{ key: '1mdof',text: '',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: { 'text-align': 'left' } },{ key: '4oga2',text: 'Please answer the questions below as throughouly as possible.  ',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 61,style: 'color-rgb(33,37,41)' },{ offset: 0,length: 61,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 61,style: 'fontsize-14' },{ offset: 0,length: 61,style: 'fontfamily-Helvetica, sans-serif' },{ offset: 0,length: 61,style: 'bgcolor-transparent' },{ offset: 0,length: 61,style: 'color-rgb(40,40,40)' } ],entityRanges: [],data: { 'text-align': 'left' } } ],entityMap: {} }
    },
    { id: 'd9581b16-99a1-4c34-9946-45e8c8d3c620',element: 'TextArea',required: true,label: { blocks: [ { key: '5mmil',text: 'Has there been a recent incident that has caused you to seek out professional training at this time?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '86859a9d-d8b8-47c2-9188-d05b0c6d2300',element: 'RadioButtons',required: true,label: { blocks: [ { key: '68v0h',text: 'Have you tried professional training with this pet in the past?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: 'b04ee540-7110-46cb-a6e1-20dbd3549758',label: 'Yes',value: 'Yes',checked: false },{ id: 'c6453a8b-ead5-44a7-a8c3-08c1abbb62fb',label: 'No',value: 'No',checked: false } ]
    },
    { id: '77fb3a75-ffbc-4d15-ae60-6b5c644f7930',element: 'RadioButtons',required: true,label: { blocks: [ { key: '5rol7',text: 'How much time do you plan to devote to training per week?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: 'b21feae0-3ced-486c-9090-a2c6cabea640',label: 'Less than 1 hour',value: 'Less than 1 hour',checked: false },{ id: '67284c03-2e70-48b1-9d58-9983105b0fbc',label: '1-2 hours',value: '1-2 hours',checked: false },{ id: 'b6988b5d-f748-4cc7-936c-df52695838c6',label: '2-5 hours',value: '2-5 hours',checked: false },{ id: '726afdf2-6ff9-486f-89c1-5d5dc66290e7',label: '5+ hours',value: '5+ hours',checked: false } ]
    },
    { id: 'cbb880c6-1dd0-4be1-844d-1c43fb383b55',element: 'Checkboxes',label: { blocks: [ { key: 'ae85r',text: 'Commands your pet knows and will perform reliably even with distractions:',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },required: false,options: [ { id: '7111ce74-39a6-48e4-a140-b82e46e2dc97',value: 'Sit',checked: false },{ id: 'e12e9a6a-44d8-4ce9-a4e0-acce73e9757b',value: 'Down',checked: false },{ id: '54b62a9c-4292-42a6-a465-e7bce6639893',value: 'Come',checked: false },{ id: '7c2414b7-c911-4369-9ce9-daca4883be7c',value: 'Heel or Loose leash Walk',checked: false },{ id: '2af832f3-79c9-4179-b5c1-22a7b597e128',value: 'Wait at Doorways',checked: false },{ id: '1b52d426-308a-441c-9534-2496bdf99dc5',value: 'Place or Climb',checked: false },{ id: '83b8afad-0ff6-4061-9187-d11663b82cf7',value: 'Leave it/Drop It',checked: false },{ id: '953ab7c0-1c6f-4a84-b7b8-fa8638d9b748',value: 'Other',checked: false } ]
    },
    { id      : '626e551b-bfb3-4872-baa4-d689c5e996f0',element : 'Checkboxes',label   : { blocks: [ { key: '9fmfc',text: 'Problem behaviours that you are noticing with your pet:',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },required: true,options : [ { id: '13abeb81-1911-41aa-899a-b98e087d7f7b',value: 'Barking',checked: false },
      { id: 'f4b9d4b2-d625-4ef3-89c8-4bfa8264bc11',value: 'Jumping',checked: false },{ id: 'be4499ad-a67e-48c5-af70-6371b2f743c0',value: 'Running through doorways',checked: false },{ id: 'f3cdbe20-6be3-45af-ae4b-bd0b3e3c4688',value: 'Not coming when called/Running away',checked: false },{ id: '3d331a44-df9f-440b-93d0-0370c24f45bb',value: 'Pulling on Leash',checked: false },
      { id: '71f81939-f3b9-4f24-908b-fe96dec9a3ec',value: 'Jumping on Furniture',checked: false },{ id: 'fa0a9c34-41cb-4b8d-a787-dcdbd5400c2a',value: 'Housebreaking',checked: false },{ id: '2402bd64-98b9-44c5-a04c-117a94b0dbb6',value: "Won't hold commands or stay",checked: false },{ id: '3a31d9b2-f1a5-447d-b3d9-0fac134d539b',value: 'Fence fighting',checked: false },{ id: 'b7729104-70fb-488f-b5db-cb92e00f7d52',value: 'Acting aggressive on leash',checked: false },
      { id: 'c532987d-4fa8-4fb8-88cf-44c4d69d5ebd',value: 'Begging',checked: false },{ id: '6cd5048a-4427-45fe-baba-d8a3cc20853c',value: 'Mounting/Humping',checked: false },{ id: '7f8b2256-c63f-446a-873c-9c30045bb1fe',value: 'Guarding toys/food',checked: false },{ id: '7c51afcc-55f2-47d0-b7bf-efdc145b0ae7',value: 'Shy or Scared of dogs or people',checked: false },{ id: 'd1786c89-78a6-422f-831b-d693079a27c9',value: 'Biting dogs or people',checked: false },
      { id: '63b84c37-fd68-4e53-9c0a-a0eea419538d',value: 'Other',checked: false } ]
    },
    { id: '469cfc1c-f268-4fec-bdd4-5f32f82428ad',element: 'TextArea',required: false,label: { blocks: [ { key: '5f4i8',text: 'If you answered other, please explain below\n',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '26ff68f2-77dc-46d1-95da-cad53ea389bd',element: 'Checkboxes',label: { blocks: [ { key: 'cdt0k',text: 'Types of Training tools you have used in past:',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: { 'text-align': 'left' } } ],entityMap: {} },required: false,options: [ { id: 'a42c62cb-e4bf-4cb0-bfdd-894fe329ae2a',value: 'Treats',checked: false },{ id: '6ce36de9-3079-4714-97ef-601a86aced08',value: 'Head Halter',checked: false },{ id: 'fea0df8c-1d83-49aa-a103-164a445555ff',value: 'Martingale Collar',checked: false },{ id: 'dcd29c5f-6499-4936-a3df-73fe2f5b4580',value: 'Pinch/Prong Collar ',checked: false },{ id: '956ab599-fcee-4667-9eed-5b7a4fb74f95',value: 'Clicker ',checked: false },{ id: 'e08d7496-7064-4fdb-8a74-f62132eac695',value: 'Remote/E-Collar',checked: false },{ id: '255247e1-4fc5-4140-a7ce-058cc1a23107',value: 'Harness',checked: false },{ id: '49d24ed3-30b0-46d9-b30b-2c83ec7f6649',value: 'Other',checked: false } ]
    },
    { id: 'b0b9f74f-92f9-4160-80d4-ab21548ac4ba',element: 'TextArea',required: false,label: { blocks: [ { key: 'd0tdu',text: 'How did you feel using the methods selected above?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '9fe00c96-4b07-42ce-a78a-ed60a9464f35',element: 'RadioButtons',required: true,label: { blocks: [ { key: 'd8ck0',text: 'How often do you walk your pet?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: '1dc9a610-8093-4ff1-a002-2303e6333d96',label: 'Rarely (less than twice a month)',value: 'Rarely',checked: false },{ id: '9ed36c45-db0b-4059-9735-f1d95acda88b',label: 'Sometimes (once a week)',value: 'Sometimes',checked: false },{ id: '81f06ef4-3083-41ce-8634-ddb0a807b6d7',label: 'Often (average four to five times a week)',value: 'Often',checked: false },{ id: '194942ad-4fff-44e7-b2e6-f5fc0b858ba7',label: 'Daily',value: 'Daily',checked: false } ]
    },
    { id: '6f619311-377d-487b-8e22-530c2d19d12c',element: 'Dropdown',label: { blocks: [ { key: '2r10l',text: 'Which side of your body does your pet walk on?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },required: false,options: [ { id: '2529a94d-9aa0-41a7-8398-e724276ed6b7',value: 'Left Side' },{ id: '0ab6c148-352e-4eb1-b62d-31254d9dbe7c',value: 'Right Side' },{ id: '4aa2002c-1007-4e10-b79a-da93b496ff17',value: 'Where ever it wants' } ]
    },
    { id: 'f41602c6-efee-4d80-a997-87c3c0900b84',element: 'TextArea',required: false,label: { blocks: [ { key: '1o46b',text: 'Is your pet motivated by food, toys, or praise? If so, please explain.',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id      : '8db71e7c-f974-48ae-a14c-bd5ab7d5ec7b',element : 'Checkboxes',label   : { blocks: [ { key: 'f38bk',text: 'How do you exercise your pet?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },required: true,options : [ { id: '132d84e9-bab3-4447-bb6d-1149f24f6742',value: 'Play fetch',checked: false },{ id: 'b944b780-2299-43af-83ca-80f6323ff064',value: 'Play Frisbee',checked: false },{ id: '83761c60-7497-4953-b5e1-93625158847c',value: 'Running',checked: false },
      { id: 'ad3de3ba-3612-47a8-871d-c06d705ccd1b',value: 'Swimming',checked: false },{ id: '74689fcb-88f0-4039-953b-6a4ef8fbce9f',value: 'Biking',checked: false },{ id: '8dc40e61-24f6-486d-bdd0-396d85531308',value: 'Playing tug',checked: false },{ id: '039815a0-a2e4-44d4-9cc5-ba04967364ff',value: 'Treadmill',checked: false },{ id: 'bcfde1b6-30be-417a-b635-9993ce968fb7',value: 'Walks/Hiking',checked: false },{ id: '41dccfed-8aee-4ed5-8a0c-bd9331fd506c',value: 'Play in the backyard',checked: false },{ id: 'a652649c-0778-4f75-9ee0-223cf32ef37e',value: 'Agility or dog sports',checked: false },{ id: '3b59c9e9-2fb7-4801-bf99-b4c6201e13ce',value: "I don't have much time to exercise them",checked: false } ]
    },
    { id: '4c3ceb9e-b146-4629-8c0b-86910b8fb943',element: 'RadioButtons',required: false,label: { blocks: [ { key: '2v1he',text: 'How much time do you exercise your pet per week?',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: '094becd0-4725-452a-a5d5-72715c1ebaf8',label: 'Less than 1 hour',value: 'Less than 1 hour',checked: false },{ id: '1035800c-d135-47c0-8d60-fc454e2dbfbd',label: '1-2 hours',value: '1-2 hours',checked: false },{ id: 'e1425b27-cd5b-42f0-8d6e-9d22d86e7d29',label: '2-5 hours',value: '2-5 hours',checked: false },{ id: '30960cde-9377-40cd-a7d4-6c493c9dfc4e',label: '5+ hours',value: '5+ hours',checked: false } ]
    },
    { id: '81b9e04d-828c-41d8-afe7-5e4901cf3c09',element: 'TextArea',required: true,label: { blocks: [ { key: '3v8g1',text: 'Please describe the goals that you would like to reach through training. e.g., "I want my dog to go hiking off leash, be nice to other dogs, and not jump on guests." ',type: 'unstyled',depth: 0,inlineStyleRanges: [],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    }
  ]

  // step 3 form
  let data3 = [
    { id: '4850bf23-4205-4f2e-b6d0-6fa3ad61c379',element: 'Label',label: { blocks: [ { key: 'fhnrd',text: 'Step 3 - Behavioral Information',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 31,style: 'BOLD' } ],entityRanges: [],data: {} } ],entityMap: {} }
    },
    { id: 'eaac5227-22fd-43d5-b67e-38b7830ce3dd',element: 'TextArea',required: true,label: { blocks: [ { key: '12km3',text: 'How many adults and children are in your home? If there are children, what are their ages: ',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 90,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 90,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 90,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 91,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '1615a29e-c35d-4ad3-8806-dff3ad620968',element: 'TextArea',required: true,label: { blocks: [ { key: 'd86f',text: 'Do you have multiple pets? If so what ages? ',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 43,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 43,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 43,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 44,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '7dd4ae3c-a10f-4e1d-ae95-7abb78ff4274',element: 'RadioButtons',required: true,label: { blocks: [ { key: '3o321',text: 'What is your pet feeding schedule? ',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 35,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 35,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 35,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 36,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: '2911a85f-6224-4823-80d2-931daf3f9aaf',label: '1 time a day',value: '1 time a day',checked: false },{ id: 'e18c5a63-1577-434c-a09f-2fbfd4fecfaa',label: '2 times a day',value: '2 times a day',checked: false },{ id: '06a8987d-dfd9-4b61-969b-95b35681ccd9',label: 'Free feed (food is left out all day or until dog eats)',value: 'Free feed (food is left out all day or until dog eats)',checked: false } ]
    },
    { id: '7b69a386-20f6-4281-8b7e-f7a1b372c973',element: 'RadioButtons',required: true,label: { blocks: [ { key: 'bd17h',text: 'Where does your pet sleep? ',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 26,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 26,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 26,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 27,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: 'a7b764fa-1b35-4136-b37a-d84577d62b78',label: 'In your bed   ',value: 'In your bed',checked: false },{ id: '01ae49b4-842e-4707-bfae-0359c92f340d',label: 'In a crate or kennel',value: 'In a crate or kennel',checked: false },{ id: 'efef109d-9cc6-4047-a72a-e69ed504b72c',label: 'Free, somewhere around the house but not in bed',value: 'Free, somewhere around the house but not in bed',checked: false },{ id: '518c4c28-7843-4306-b6f7-4f33c724faaa',label: 'Other',value: 'Other',checked: false } ]
    },
    { id: 'b6aec9da-077f-4f1c-978c-c5a1ce611993',element: 'RadioButtons',required: true,label: { blocks: [ { key: 'cvpho',text: 'Is your pet allowed on furniture? ',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 33,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 33,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 33,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 34,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: '8c15d021-28cf-400c-b5c7-bf24a0adfba4',label: 'Yes',value: 'yes',checked: false },{ id: 'd7d6f8ee-ad18-4838-98da-95b5ccf0231f',label: 'No',value: 'no',checked: false },{ id: 'da9179ce-9325-4d86-8a5a-6cb148306280',label: 'Only when invited up',value: 'only when invited up',checked: false } ]
    },
    { id: '341ccee5-f3ab-42bb-ae94-692394b7d09c',element: 'Checkboxes',label: { blocks: [ { key: '44n5k',text: 'Is your pet scared or aggressive towards objects. Choose all that apply',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 71,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 71,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 71,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 71,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },required: false,options: [ { id: 'ffc03b92-5a08-4d93-88dc-edd60c9e96de',value: 'Cars/Trucks',checked: false },{ id: 'f7d192c1-c3ef-4e8c-a88c-bb705dddb977',value: 'Bicycles/Skateboards',checked: false },{ id: '3f6c4c77-d52c-421d-b1f6-7bbc44def60b',value: 'Strollers',checked: false },{ id: 'dd1ddfd7-62fd-4482-adb6-3638b16074c9',value: 'Garbage Cans',checked: false },{ id: '09fc57c7-fa5a-4ed1-a116-229648683c0a',value: 'Loud objects such as vacuum or leaf blower',checked: false },{ id: '7f55a356-a511-4785-8960-1b37aab29116',value: 'Other',checked: false } ]
    },
    { id: '6635038b-3c08-49f2-8480-1f6814fde1fa',element: 'RadioButtons',required: true,label: { blocks: [ { key: '8jajq',text: 'Does your pet like children? ',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 28,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 28,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 28,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 29,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: 'e84ba815-e65b-4018-b003-75f4430ab300',label: 'Yes',value: 'yes',checked: false },{ id: 'cca20f62-6b13-4e39-aa55-ea0be65b6a53',label: 'No',value: 'no',checked: false } ]
    },
    { id: 'e581189b-ae68-4d38-933a-79e7be26db93',element: 'Checkboxes',label: { blocks: [ { key: '49j0v',text: 'Has your pet ever bitten a dog or human? ',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 40,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 40,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 40,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 41,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },required: false,options: [ { id: '2b9ed051-e0e2-430a-8aa6-7389a1ee8bf1',value: 'Dog',checked: false },{ id: 'e762b714-82b3-4c37-bcd7-e4582455345e',value: 'Human',checked: false } ]
    },
    { id: '469ddeab-7607-46bd-bdac-84cb523ec46e',element: 'TextArea',required: false,label: { blocks: [ { key: '9gbkc',text: 'If so please explain. ',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 21,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 21,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 21,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 22,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },value: ''
    },
    { id: '043314ee-1be0-4dfb-be11-2c967d42d521',element: 'RadioButtons',required: true,label: { blocks: [ { key: 'h2fd',text: 'Is your pet scared of new people or places?',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 43,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 43,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 43,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 43,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: '463879f0-a73b-48db-b521-5b9752e1109f',label: 'Yes',value: 'yes',checked: false },{ id: 'e4cbe7b0-f121-4cc7-b9c3-357daede5bb3',label: 'No',value: 'no',checked: false } ]
    },
    { id: 'e1d46705-ab1e-482d-8814-47b7a089f14f',element: 'RadioButtons',required: true,label: { blocks: [ { key: 'fdrcp',text: 'How does your pet behave in the car?',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 36,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 36,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 36,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 36,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: '6c4e92e9-1ce4-43fe-8ac9-6e7c64611857',label: 'Happy/Excited',value: 'Happy/Excited',checked: false },{ id: 'c3090f58-0a4f-4ada-91fa-234320b08f5f',label: 'Neutral',value: 'Neutral',checked: false },{ id: '444a2c67-22bf-47f3-a47d-25cb3ad0c39e',label: 'Scared/Aggressive',value: 'Scared/Aggressive',checked: false } ]
    },
    { id: '4438d9c8-e9cb-417b-810b-59da6b70ca15',element: 'RadioButtons',required: true,label: { blocks: [ { key: '5icnn',text: 'How does your pet behave at the vet?',type: 'unstyled',depth: 0,inlineStyleRanges: [ { offset: 0,length: 36,style: 'color-rgb(40,40,40)' },{ offset: 0,length: 36,style: 'bgcolor-rgb(255,255,255)' },{ offset: 0,length: 36,style: 'fontfamily-National 2", sans-serif' },{ offset: 0,length: 36,style: 'fontsize-14' } ],entityRanges: [],data: {} } ],entityMap: {} },options: [ { id: '4019153a-c357-48bc-8975-6cf4b0b1deeb',label: 'Happy/Excited',value: 'Happy/Excited',checked: false },{ id: '5c1a4dfd-07c0-4674-9edf-2f2857594e79',label: 'Neutral',value: 'Neutral',checked: false },{ id: 'ee6ef354-50a9-42b5-9eef-c77457214cec',label: 'Scared/Aggressive',value: 'Scared/Aggressive',checked: false } ]
    }
  ]

  const [ form, setForm ] = useState()

  useEffect(() => {
    props.getClient(`${clientId}`)
  }, [])

  const name = clientDetail.item.first_name + ' ' + clientDetail.item.last_name

  let valueName = { 'a10ce32f-2803-4ec1-a878-7fe00898591d': `${name}`, '3e961b09-3da2-4b68-b415-be9e93faea32': `${clientDetail.item.email}` }

  const _handleFillForm1 = () => {
    setForm('form1')
  }

  const _handleFillForm2 = () => {
    setForm('form2')
  }

  const _handleFillForm3 = () => {
    setForm('form3')
  }

  const _handleForm1Submit = () => {
    setForm()
  }

  const _handleForm2Submit = () => {
    setForm()
  }

  const _handleForm3Submit = () => {
    setForm()
  }

  const companyName = currentTenant && currentTenant.legal_name

  return (
    <>
      <Grid className='mv0 mh40'>
        <Grid.Column
          computer={3} mobile={16} style={{ paddingBottom: 0, paddingRight: 0 }}
          tablet={3} >
          <Image className='logo-img' src='/images/logo.png' style={{ padding: '1.3rem' }}/>
        </Grid.Column>
        <Grid.Column className='mh20' width={16}>
          <Header>Training Questionnaire</Header>
          <span>Thank you for your interest in training at {`${companyName}`}.
            Please click on the link below and complete the questionnaire regarding your training needs and expectations.</span>
        </Grid.Column>
        <Grid.Column className='mh20' width={16}>
          <Link
            as='a'
            onClick={_handleFillForm1}>Step 1 - Client and Pet Information
          </Link>
        </Grid.Column>
        <Grid.Column className='mh20' width={16}>
          <Link
            as='a'
            onClick={_handleFillForm2}>Step 2 - Training Information
          </Link>
        </Grid.Column>
        <Grid.Column className='mh20' width={16}>
          <Link
            as='a'
            onClick={_handleFillForm3}>Step 3 - Behavioral Information
          </Link>
        </Grid.Column>
      </Grid>
      {
        form === 'form1' && (

          <div className='checkbox-box'>
            <FormGenerator
              formData={data1}
              onSubmit={_handleForm1Submit}
              readOnly={false}
              responseData={valueName}/>
          </div>)
      }
      {
        form === 'form2' && (

          <div className='checkbox-box'>
            <FormGenerator
              formData={data2}
              onSubmit={_handleForm2Submit}
              readOnly={false}/>
          </div>)
      }
      {
        form === 'form3' && (
          <div className='checkbox-box'>
            <FormGenerator
              formData={data3}
              onSubmit={_handleForm3Submit}
              readOnly={false}/>
          </div>)
      }
    </>
  )
}

export default compose(
  connect(
    ({ auth, ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)

      return {
        clientDetail : clientDetailDuck.selectors.detail(state),
        currentTenant: authDuck.selectors.getCurrentTenant(auth),
        petReservationDetail
      }
    },
    {
      getClient: clientDetailDuck.creators.get,
      setItem  : petReservationDetailDuck.creators.setItem
    }
  )
)(TrainingForm)
