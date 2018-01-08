function goToPreviousLocation(component, defaultLocation) {
    const location = component.props.location;
    const history = component.props.history;

    const redirectTo = (location.state && location.state.from) || defaultLocation;
    history.push(redirectTo);
}

export default goToPreviousLocation;
