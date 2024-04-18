// A storage of commonly used assets ie functions, arrays etc

export const handleValidation = (value, setFunc, valFunc, regex) => {
  //set email to user input
  setFunc(value);
  
  //define regex     
  const reg = new RegExp(regex); 
  
  //test whether input is valid
  valFunc(reg.test(value));
};

export const titles = [
    {
      value: 'Mr.',
      label: 'Mr.',
    },
    {
      value: 'Ms.',
      label: 'Ms.',
    },
    {
      value: 'Mrs.',
      label: 'Mrs.',
    },
    {
      value: 'Brother',
      label: 'Brother',
    },
    {
      value: 'Sister',
      label: 'Sister',
    },
    {
      value: 'Pastor',
      label: 'Pastor',
    },

    {
      value: 'Deacon',
      label: 'Deacon',
    },
    {
      value: 'Deaconess',
      label: 'Deaconess',
    },
    {
      value: 'Rev.',
      label: 'Rev.',
    },
    {
      value: 'Dr.',
      label: 'Dr.',
    },
  ]

  export const churches = [
    'CE LOVE CHURCH BARKING', 'CE BARKING', 'CE EAST HAM', 'CE ILFORD', 'CE MEDWAY', 'CE PORTSMOUTH', 'CE HARLOW',
    'CE BELFAST', 'CE BRISTOL 1', 'CE BRISTOL 2', 'CE LOVE CHURCH BRISTOL', 'CE THURROCK', 'CE COLCHESTER',
    'CE DOCKLANDS', 'CE GLOUCESTER', 'CE BATH', 'CE BASILDON', 'CE ROMFORD', 'CE STRATFORD',
    'CE CYPRUS', 'CE LOVE CHURCH DAGENHAM', 'OTHER'
  ]