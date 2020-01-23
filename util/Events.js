module.exports.waitForEvent = (event, from = 0, to = 'latest') =>
  new Promise (
      (resolve,reject) => event(
          {fromBlock: from, toBlock: to},
          (e, ev) => e ? reject(e) : resolve(ev)
      )
  );
