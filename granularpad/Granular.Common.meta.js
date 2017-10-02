Bridge.assembly("Granular.Common", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,Granular.Compatibility,Granular.Collections];
    $m($n[1].AssemblyReferenceAttribute, function () { return {"am":true}; });
    $m($n[2].ObservableCollection$1, function (T) { return {"m":[{"a":2,"n":"Count","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_Count","t":8,"rt":$n[0].Int32,"fg":"Count","box":function ($v) { return Bridge.box($v, System.Int32);}},"fn":"Count"},{"a":2,"n":"Item","t":16,"rt":T,"p":[$n[0].Int32],"i":true,"ipi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"g":{"a":2,"n":"get_Item","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"sn":"getItem","rt":T,"p":[$n[0].Int32]},"s":{"a":2,"n":"set_Item","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0},{"n":"value","pt":T,"ps":1}],"sn":"setItem","rt":$n[0].Void,"p":[$n[0].Int32,T]}}]}; });
});
