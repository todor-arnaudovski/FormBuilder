const formElement = document.getElementById('formElement');

const getData = async () => {
  const response = await fetch('./formStructureData.json');
  const formStructure = await response.json();

  return formStructure;
};

// Create a text field
const createTextFIeld = (id, fieldType, fieldProps, fieldWrapper) => {
  const newField = document.createElement('input');
  newField.type = fieldType;
  newField.id = `field${id}`;
  newField.classList.add('form-control');
  if (fieldProps.placeholder) newField.placeholder = fieldProps.placeholder;
  if (fieldProps.required) newField.required = true;

  fieldWrapper.append(newField);
};

// Create a textarea field
const createTextareaField = (id, fieldProps, fieldWrapper) => {
  const newField = document.createElement('textarea');
  newField.rows = fieldProps.rows ? fieldProps.rows : 3;
  newField.id = `field${id}`;
  newField.classList.add('form-control');
  if (fieldProps.placeholder) newField.placeholder = fieldProps.placeholder;
  if (fieldProps.required) newField.required = true;

  fieldWrapper.append(newField);
};

// Create a checkbox field
const createCheckboxField = (checkId, fieldType, formCheckWrapper) => {
  const newField = document.createElement('input');
  newField.type = fieldType;
  newField.id = `field${checkId}`;
  newField.classList.add('form-check-input');
  // if (fieldProps.required) newField.required = true;

  formCheckWrapper.append(newField);
};

// Create a radio field
const createRadioField = (id, checkId, fieldType, formCheckWrapper) => {
  const newField = document.createElement('input');
  newField.type = fieldType;
  newField.id = `field${checkId}`;
  newField.name = `input${id}Radio`;
  newField.classList.add('form-check-input');
  // if (fieldProps.required) newField.required = true;

  formCheckWrapper.append(newField);
};

// Create a field label
const createFieldLabel = (id, label, fieldWrapper, cssClass) => {
  const newFieldLabel = document.createElement('label');
  newFieldLabel.htmlFor = `field${id}`;
  newFieldLabel.innerText = label;
  if (cssClass) newFieldLabel.classList.add(cssClass);

  fieldWrapper.append(newFieldLabel);
};

// Create the field
const createField = (id, fieldType, fieldProps) => {
  const fieldWrapper = document.createElement('div');
  fieldWrapper.classList.add('form-group', 'mb-2');

  switch (fieldType) {
    case 'text':
      if (fieldProps.label)
        createFieldLabel(id, fieldProps.label, fieldWrapper);
      createTextFIeld(id, fieldType, fieldProps, fieldWrapper);
      break;
    case 'textarea':
      if (fieldProps.label)
        createFieldLabel(id, fieldProps.label, fieldWrapper);
      createTextareaField(id, fieldProps, fieldWrapper);
      break;
    case 'checkbox':
      if (fieldProps.label) {
        const checkboxHeader = document.createElement('div');
        checkboxHeader.innerText = fieldProps.label;
        checkboxHeader.classList.add('checkbox-header');
        fieldWrapper.appendChild(checkboxHeader);
      }
      fieldProps.options.forEach((option, i) => {
        const formCheckWrapper = document.createElement('div');
        formCheckWrapper.classList.add('form-check');

        const checkId = `${id}_${i}`;

        createCheckboxField(checkId, fieldType, formCheckWrapper);
        createFieldLabel(checkId, option, formCheckWrapper, 'form-check-label');

        fieldWrapper.append(formCheckWrapper);
      });
      break;
    case 'radio':
      if (fieldProps.label) {
        const checkboxHeader = document.createElement('div');
        checkboxHeader.innerText = fieldProps.label;
        checkboxHeader.classList.add('checkbox-header');
        fieldWrapper.appendChild(checkboxHeader);
      }
      fieldProps.options.forEach((option, i) => {
        const formCheckWrapper = document.createElement('div');
        formCheckWrapper.classList.add('form-check');

        const checkId = `${id}_${i}`;

        createRadioField(id, checkId, fieldType, formCheckWrapper);
        createFieldLabel(checkId, option, formCheckWrapper, 'form-check-label');

        fieldWrapper.append(formCheckWrapper);
      });
      break;
    default:
      console.log('Invalid field type');
  }

  formElement.appendChild(fieldWrapper);
};

const createForm = async () => {
  const formData = await getData();

  // Form title and descriptin
  const formTitle = document.getElementById('formTitle'),
    formDescription = document.getElementById('formDescription');

  formTitle.innerText = formData[0].formTitle;
  formDescription.innerText = formData[0].formDescription;

  // Form fields
  const formFields = formData[1];

  formFields.forEach((field, i) => {
    const { id, fieldType, fieldProperties } = field;

    createField(id, fieldType, fieldProperties);
  });
};

// Form init
createForm();
