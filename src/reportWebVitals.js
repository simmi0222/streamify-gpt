const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

// Web Vitals are a set of metrics that measure the performance and user experience of a web page.
// 3 main WebVitals are :-
// (LCP) Largest Contentful Paint
// (FID) First Input Delay
// (CLS) Cumulative Layout Shift

// If you want to start measuring performance in your app, pass a function to
// log(print) results (for example: reportWebVitals(console.log)) or
// send to an analytics endpoint.
// Learn more: https://bit.ly/CRA-vitals
