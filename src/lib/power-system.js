// powerSystem :: Array -> Object
const powerSystem  = ({name, components}) => {
  return {
    name,
    components: Array.from(components)
  };
};

export default powerSystem;
