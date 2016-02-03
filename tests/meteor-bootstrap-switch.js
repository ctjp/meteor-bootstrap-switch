Tinytest.add('bootstrap-switch - Defines', function (test) {
  // Function
  test.equal(typeof jQuery.fn.bootstrapSwitch, 'function');
});

Tinytest.add('bootstrap-switch - Applies', function (test) {
  var el = jQuery('<input type="checkbox" />').appendTo('body').bootstrapSwitch();
  test.equal(el.closest('.bootstrap-switch').length, 1);
  el.closest('.bootstrap-switch').remove();
});
