(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message]1
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('autopostback-fix');

  test('constructor test', function() {
    expect(1);

    var ddlList        = $('#ddlList')[0],
        ddlListHandler = new bstruthers.AutoPostBackFix(ddlList);

    strictEqual(typeof ddlListHandler, 'object', 'Instance of AutoPostBackFix constructed');
  });

  test('onchange test', function() {
    expect(3);

    var $ddlList = $('#ddlList'),
        onchange = $ddlList.attr('onchange'),
        ddlListHandler;

    // Ensure the onchange attribute is on our test element
    notStrictEqual($ddlList.attr('onchange'), undefined, 'onchange attribute present');

    // Create a new instance, this removes the onchange attribute
    ddlListHandler = new bstruthers.AutoPostBackFix($ddlList[0]);
    strictEqual($ddlList.attr('onchange'), undefined, 'onchange attribute removed');

    // Calling destory will restore the original onchange attribute
    ddlListHandler.destroy();
    strictEqual($ddlList.attr('onchange'), onchange, 'onchange attribute restored to original state');
  });

  // Doesn't seem like there's a way to test this - I'm open to ideas
  // test('handlers test', function() {
  //   expect(2);

  //   var ddlList        = $('#ddlList')[0],
  //       ddlListHandler,
  //       eventListeners = getEventListeners(ddlList)

  //   // Ensure no handlers are already attached

  //   // Create a new instance, this will automatically add the handlers
  //   ddlListHandler = new bstruthers.AutoPostBackFix(ddlList);

  //   // Calling disable will remove the handlers
  //   ddlListHandler.disable();

  //   // Calling enable will re-add the handlers
  //   dlListHandler.enable();

  //   // Calling destory will remove the handlers
  //   ddlListHandler.destroy();
  // });
}(jQuery));
