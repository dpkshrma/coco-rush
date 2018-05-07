import React from 'react';
import ReactGA from 'react-ga';

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  const trackEvent = (event) => {
    ReactGA.event(event);
  };

  const HOC = class extends React.Component {
    componentDidMount() {
      const page = window.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = window.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} track={trackEvent} />;
    }
  };

  return HOC;
}
