const getStyledComponentId = (componentOrProps = {}) => {
  let id = componentOrProps.styledComponentId;
  if (!id) id = (componentOrProps.forwardedComponent || {}).styledComponentId;
  if (!id) return;
  return id.replace(/^sc\-/, '');
}

export default getStyledComponentId;
