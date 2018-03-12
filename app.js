// This is a JavaScript file

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


window.fn = {};

window.fn.open = function() {
	var menu = document.getElementById('menu');
	menu.open();
};

window.fn.load = function(page) {
	var content = document.getElementById('content');
	var menu = document.getElementById('menu');
	content.load(page).then(menu.close.bind(menu));
};


var touroku = function() {

	var kaibetsu = parseInt(document.getElementById('kaibetsu').value,10);
	var hit1 = parseInt(document.getElementById('hit1').value,10);
	var hit2 = parseInt(document.getElementById('hit2').value,10);
	var hit3 = parseInt(document.getElementById('hit3').value,10);
	var hit4 = parseInt(document.getElementById('hit4').value,10);
	var hit5 = parseInt(document.getElementById('hit5').value,10);
	var hit6 = parseInt(document.getElementById('hit6').value,10);
	var bonus = parseInt(document.getElementById('bonus').value,10);

	console.log("kaibetsu = " + kaibetsu);
	console.log("hit1 = " + hit1);
	console.log("hit2 = " + hit2);
	console.log("hit3 = " + hit3);
	console.log("hit4 = " + hit4);
	console.log("hit5 = " + hit5);
	console.log("hit6 = " + hit6);
	console.log("bonus = " + bonus);

	var gusu = 0;
	var dai = 0;
	var goukei = 0;

	if ( hit1 % 2 == 0 ) { gusu = gusu + 1; }
	if ( hit2 % 2 == 0 ) { gusu = gusu + 1; }
	if ( hit3 % 2 == 0 ) { gusu = gusu + 1; }
	if ( hit4 % 2 == 0 ) { gusu = gusu + 1; }
	if ( hit5 % 2 == 0 ) { gusu = gusu + 1; }
	if ( hit6 % 2 == 0 ) { gusu = gusu + 1; }

	if ( hit1 > 22 ) { dai = dai + 1; }
	if ( hit2 > 22 ) { dai = dai + 1; }
	if ( hit3 > 22 ) { dai = dai + 1; }
	if ( hit4 > 22 ) { dai = dai + 1; }
	if ( hit5 > 22 ) { dai = dai + 1; }
	if ( hit6 > 22 ) { dai = dai + 1; }

	goukei = hit1 + hit2 + hit3 + hit4 + hit5 + hit6;

	var TousenBango = AV.Object.extend('TousenBango');
	var tousenbango = new TousenBango();

	var acl = new AV.ACL();
	acl.setPublicReadAccess(true);
	acl.setWriteAccess("*", true);

	tousenbango.setACL(acl);

	tousenbango.save({
	    hit1: parseInt(hit1,10),
	    hit2: parseInt(hit2,10),
	    hit3: parseInt(hit3,10),
	    hit4: parseInt(hit4,10),
	    hit5: parseInt(hit5,10),
	    hit6: parseInt(hit6,10),
		bonus: parseInt(bonus,10),
		kaibetsu: parseInt(kaibetsu,10),
		gusu: gusu,
		dai: dai,
		goukei: goukei
	}).then(function(results) {
	    console.log("TousenBango Ins OK");
		console.log("touroku end");
		ons.notification.alert('登録完了！');
		document.getElementById('kaibetsu').value = "";
        document.getElementById('hit1').value = "";
        document.getElementById('hit2').value = "";
        document.getElementById('hit3').value = "";
        document.getElementById('hit4').value = "";
        document.getElementById('hit5').value = "";
        document.getElementById('hit6').value = "";
        document.getElementById('bonus').value = "";
	})
	.catch(function(err){
		console.log("TousenBango Ins NG" + err);
		ons.notification.alert('登録エラー！　' + err );
		document.getElementById('kaibetsu').value = "";
        document.getElementById('hit1').value = "";
        document.getElementById('hit2').value = "";
        document.getElementById('hit3').value = "";
        document.getElementById('hit4').value = "";
        document.getElementById('hit5').value = "";
        document.getElementById('hit6').value = "";
        document.getElementById('bonus').value = "";
	});
}

var hazure = function() {

/*
1. HazureKaisuとTousenBangoの突合せ
最新kaisuより大きい数がTousenBangoにあるか？
あればその差分とレコード内容を確保し、
最新kaibetsuの数から以下を開始する。
これを差分分繰り返す。
*/

/*
2. HazureKaisuの新規レコード作成
kaibetsuのひとつ前のHazureKaisuのレコードの内容を新規レコードにコピー。
全ての数値を＋１する。
*/

/*
3. TousenBangoのレコード内容をもとにHazureKaisuの新規レコード更新
当選番号と合致するHazureKaisuの新規レコードの該当項目に0をセットする。
*/

	lcfindHazureKaisu()
	  .then(lccheckTousenBango)
	  .then(lcInsHazureKaisu)
	  .then(function(results) {
			console.log("hazure OK");
			ons.notification.alert("正常終了！");
	})
      .catch(function(e) {
		console.log("hazure NG　" + e);
        ons.notification.alert({
            title: '処理中止！',
            messageHTML: e,
            buttonLabel: 'OK',
            animation: 'default',
            callback: function() {
            }
        });
	});
}

var lcfindHazureKaisu = function() {
    return new Promise(function(resolve, reject) {

		var output = {};

        var query = new AV.Query('HazureKaisu');
		query.descending('kaibetsu');
		query.limit(1);
        query.find().then(function (results) {
            var object = results[0];
            output.kaibetsu = object.get("kaibetsu");
            output.hit1  = object.get("1");
            output.hit2  = object.get("2");
            output.hit3  = object.get("3");
            output.hit4  = object.get("4");
            output.hit5  = object.get("5");
            output.hit6  = object.get("6");
            output.hit7  = object.get("7");
            output.hit8  = object.get("8");
            output.hit9  = object.get("9");
            output.hit10 = object.get("10");
            output.hit11 = object.get("11");
            output.hit12 = object.get("12");
            output.hit13 = object.get("13");
            output.hit14 = object.get("14");
            output.hit15 = object.get("15");
            output.hit16 = object.get("16");
            output.hit17 = object.get("17");
            output.hit18 = object.get("18");
            output.hit19 = object.get("19");
            output.hit20 = object.get("20");
            output.hit21 = object.get("21");
            output.hit22 = object.get("22");
            output.hit23 = object.get("23");
            output.hit24 = object.get("24");
            output.hit25 = object.get("25");
            output.hit26 = object.get("26");
            output.hit27 = object.get("27");
            output.hit28 = object.get("28");
            output.hit29 = object.get("29");
            output.hit30 = object.get("30");
            output.hit31 = object.get("31");
            output.hit32 = object.get("32");
            output.hit33 = object.get("33");
            output.hit34 = object.get("34");
            output.hit35 = object.get("35");
            output.hit36 = object.get("36");
            output.hit37 = object.get("37");
            output.hit38 = object.get("38");
            output.hit39 = object.get("39");
            output.hit40 = object.get("40");
            output.hit41 = object.get("41");
            output.hit42 = object.get("42");
            output.hit43 = object.get("43");

			var storage = localStorage;
			storage.setItem("HAZUREKAISU", JSON.stringify(output));

            resolve();
            console.log("HazureKaisu Fetch OK");
        }, function (error) {
            console.log("HazureKaisu Fetch NG "  + err);
            reject("HazureKaisu Fetch NG " + err);
        });

    });
};

var lccheckTousenBango = function() {
    return new Promise(function(resolve, reject) {

		console.log("lccheckTousenBango start");
		var storage = localStorage;
		var str = storage.getItem("HAZUREKAISU");
		var input = JSON.parse(str);

		var output = {};

		var kaibetsu;

        var query = new AV.Query('TousenBango');
		query.descending('kaibetsu');
        query.find().then(function (results) {
            var object = results[0];
            kaibetsu = object.get("kaibetsu");
			console.log("kaibetsu = " + kaibetsu);
			console.log("input.kaibetsu = " + input.kaibetsu);
			if ( kaibetsu === input.kaibetsu ) {
				reject("はずれ回数は最新の状態です。");
			} else if ( kaibetsu > input.kaibetsu ) {
				output.klength = kaibetsu - input.kaibetsu;
				console.log("output.klength = " + output.klength);
				for ( var i = 0; i < output.klength; i++ ) {
					if ( i > 0 ) {
						object = results[i];
					}
					output[i] = {};
					output[i].hit1    = object.get("hit1");
					output[i].hit2    = object.get("hit2");
					output[i].hit3    = object.get("hit3");
					output[i].hit4    = object.get("hit4");
					output[i].hit5    = object.get("hit5");
					output[i].hit6    = object.get("hit6");
					output[i].bonus    = object.get("bonus");
					output[i].date    = object.get("date");
					output[i].kaibetsu = object.get("kaibetsu");
					//console.log("output[" + i + "].hit1 = " + output[i].hit1);
					console.log("output[" + i + "].kaibetsu = " + output[i].kaibetsu);
				}
				console.log("lccheckTousenBango end");
				resolve(output);
			}
        }, function (error) {
            console.log("TousenBango Fetch NG "  + err);
            reject("TousenBango Fetch NG " + err);
        });
    });
};

var lcInsHazureKaisu = function(tousenbango) {	
    return new Promise(function(resolve2, reject) {

		console.log("lcInsHazureKaisu start");
		var storage = localStorage;
		var str = storage.getItem("HAZUREKAISU");
		var output = JSON.parse(str);

        var promises = [];
        var objectid;
		var suji;
        for (var i = tousenbango.klength - 1; i >= 0; i-- ) {
            output.kaibetsu = output.kaibetsu + 1;
			//console.log("0 output.hit1 = " + output['hit' + 1]);
			for (var j = 0; j < 43; j++) {
				suji = j + 1;
				//console.log("0 output.hit" + suji + " = " + output['hit' + suji]);
				switch (suji) {
					case tousenbango[i].hit1:
						output['hit' + suji] = 0; break;
					case tousenbango[i].hit2:
						output['hit' + suji] = 0; break;
					case tousenbango[i].hit3:
						output['hit' + suji] = 0; break;
					case tousenbango[i].hit4:
						output['hit' + suji] = 0; break;
					case tousenbango[i].hit5:
						output['hit' + suji] = 0; break;
					case tousenbango[i].hit6:
						output['hit' + suji] = 0; break;
					default:
						output['hit' + suji] = output['hit' + suji] + 1; break;
				}
			}
			//console.log("1 output.hit1 = " + output.hit1);
            promises.push(omotaiPromise(output));
        }
        Promise.all(promises)
          .then(function (results) {
            // results配列の各要素で結果が取れる
			console.log("lcInsHazureKaisu end");
            resolve2();
        });

        function omotaiPromise(output) {
            return new Promise(function (resolve1, reject) {
                
				console.log("2 output.hit1 = " + output.hit1);
				console.log("2 output.kaibetsu = " + output.kaibetsu);
				var HazureKaisu = AV.Object.extend('HazureKaisu');
				var hazurekaisu = new HazureKaisu();

				var acl = new AV.ACL();
				acl.setPublicReadAccess(true);
				acl.setWriteAccess("*", true);

				hazurekaisu.setACL(acl);

				hazurekaisu.save({
				    1 : output.hit1,
				    2 : output.hit2,
				    3 : output.hit3,
				    4 : output.hit4,
				    5 : output.hit5,
				    6 : output.hit6,
					7 : output.hit7,
					8 : output.hit8,
                    9 : output.hit9,
                    10: output.hit10,
                    11: output.hit11,
                    12: output.hit12,
                    13: output.hit13,
                    14: output.hit14,
                    15: output.hit15,
                    16: output.hit16,
                    17: output.hit17,
                    18: output.hit18,
                    19: output.hit19,
                    20: output.hit20,
                    21: output.hit21,
                    22: output.hit22,
                    23: output.hit23,
                    24: output.hit24,
                    25: output.hit25,
                    26: output.hit26,
                    27: output.hit27,
                    28: output.hit28,
                    29: output.hit29,
                    30: output.hit30,
                    31: output.hit31,
                    32: output.hit32,
                    33: output.hit33,
                    34: output.hit34,
                    35: output.hit35,
                    36: output.hit36,
                    37: output.hit37,
                    38: output.hit38,
                    39: output.hit39,
                    40: output.hit40,
                    41: output.hit41,
                    42: output.hit42,
                    43: output.hit43,
                    kaibetsu: output.kaibetsu
				}).then(function(results) {
				    console.log("HazureKaisu Ins OK");
					resolve1();
				})
				.catch(function(err){
					console.log("HazureKaisu Ins NG" + err);
					reject("HazureKaisu Ins NG" + err);
				});
    	    });
    	}

    });
};

var goukei = function() {	

	console.log("goukei start");

	lcSelHazureKaisugoukei()
	  .then(hazuregoukei)
	  .then(lcUpdHazureKaisugoukei)
	  .then(function(results) {
			console.log("goukei OK");
			ons.notification.alert("正常終了！");
	})
      .catch(function(e) {
		console.log("goukei NG　" + e);
        ons.notification.alert({
            title: '処理中止！',
            messageHTML: e,
            buttonLabel: 'OK',
            animation: 'default',
            callback: function() {
            }
        });
	});
};

var lcSelHazureKaisugoukei = function() {
    return new Promise(function(resolve, reject) {

		console.log("lcSelHazureKaisugoukei start");

		var output = {};

        var query = new AV.Query('HazureKaisu');
		query.descending('kaibetsu');
        query.find().then(function (results) {
			var object;
			var suji;
			for (var i = 0; i < results.length; i++) {
				object = results[i];
				output[i] = {};
				output[i].kaibetsu = object.get("kaibetsu");
				output[i].goukei = object.get("goukei");
				output[i].objectid   = object.get("objectId");
				for (var j = 0; j < 43; j++) {
					suji = j + 1;
					output[i]['hit' + suji] = object.get(suji);
				}
			}
			output[0].cnt = results.length;
			console.log("output[0].cnt = " + output[0].cnt);
			console.log("lcSelHazureKaisugoukei end");
			resolve(output);
        }, function (error) {
            console.log("HazureKaisu Fetch NG "  + err);
            reject("HazureKaisu Fetch NG " + err);
        });
    });
};

var hazuregoukei = function(arg) {
    return new Promise(function(resolve) {

		console.log("hazuregoukei start");
		
		var zenkai;
		var suji;
		var goukei = {};
		var cnt = 0;
		var sixcnt = 0;
		var hotcnt = 0;
		var j;
		console.log(1);
		for ( var i = 0; i < arg[0].cnt; i++ ) {
			if ( arg[i].goukei === 0 ) {
				console.log("arg[i].kaibetsu = " + arg[i].kaibetsu);
				goukei[cnt] = {};
				goukei[cnt].kaibetsu = arg[i].kaibetsu;
				goukei[cnt].objectid = arg[i].objectid;
				goukei[cnt].goukei = 0;
				hotcnt = 0;
				sixcnt = 0;
				for( j = 0; j < 43; j++ ) {
					suji = j + 1;
					if ( arg[i]['hit' + suji] === 0 ) {
						goukei[cnt].goukei = goukei[cnt].goukei + arg[i+1]['hit' + suji];
						if ( arg[i+1]['hit' + suji] < 11 ) {
							hotcnt = hotcnt + 1;
						}
						sixcnt = sixcnt + 1;
					}
					if ( sixcnt === 6 ) {
						goukei[cnt].L10 = hotcnt;
						j = 43;
					}
				}
				cnt = cnt + 1;
			}
		}
		goukei[0].cnt = cnt;
		console.log("hazuregoukei end");
		resolve(goukei);
	});
};

var lcUpdHazureKaisugoukei = function(arg) {
    return new Promise(function(resolve2) {

		console.log("lcUpdHazureKaisugoukei start");

        var promises = [];
        var objectid;
		var goukei;
		var l10;
        for (var i = 0; i < arg[0].cnt; i++ ) {
            objectid = arg[i].objectid;
            goukei = arg[i].goukei;
			l10 = arg[i].L10;
            promises.push(omotaiPromise(objectid, goukei, l10));
        }
        Promise.all(promises)
          .then(function (results) {
		    console.log("lcUpdHazureKaisugoukei end");
            resolve2(results);
        });
        function omotaiPromise(objectid, goukei, l10) {
            return new Promise(function (resolve1) {
		        var hazurekaisu = AV.Object.createWithoutData('HazureKaisu', objectid);
		        hazurekaisu.set('goukei', goukei);
		        hazurekaisu.set('l10', l10);
		        hazurekaisu.save();
				resolve1();
    	    });
    	}
	});
};

var heikin = function(arg) {

	console.log("heikin start");

	/*
	var storage = localStorage;
	var str = storage.getItem("hotnum");
	var hotnum = JSON.parse(str);
	var hotcnt = storage.getItem("hotcnt");
	str = storage.getItem("coldnum");
	var coldnum = JSON.parse(str);
	var coldcnt = storage.getItem("coldcnt");

	console.log("hotcnt, coldcnt = " + hotcnt + ", " + coldcnt);
	*/

    var promises = [
        lcSelHazureKaisuheikin(),
        lcTousenBangoheikin()
    ];
    Promise.all(promises)
	  .then(function(results) {
			var goukeiheikin = results[0].goukei / 10;
			var l10heikin = results[0].l10 / 10;
			var gusuheikin = results[1].gusu / 10;
			var daiheikin = results[1].dai / 10;
			var goukei2heikin = results[1].goukei / 10;
			console.log("heikin end");
	        ons.notification.alert({
	            title: '正常終了！',
	            messageHTML: 'はずれ回数合計平均：' + goukeiheikin + '<BR>' + 'Ｌ１０平均：' + l10heikin + '<BR>' + '偶数平均：' + gusuheikin + '<BR>' + '大数値平均：' + daiheikin + '<BR>' + '合計平均：' + goukei2heikin,
	            buttonLabel: 'OK',
	            animation: 'default',
	            callback: function() {
	            }
	        });
	})
      .catch(function(e) {
		console.log("goukei NG　" + e);
        ons.notification.alert({
            title: '処理中止！',
            messageHTML: e,
            buttonLabel: 'OK',
            animation: 'default',
            callback: function() {
            }
        });
	});
};

var lcSelHazureKaisuheikin = function() {
    return new Promise(function(resolve, reject) {

		console.log("lcSelHazureKaisuheikin start");

		var output = {};
		var object;
		output.goukei = 0;
		output.l10 = 0;
		var hotnum = [];
		var hotcnt = 0;
		var coldnum = [];
		var coldcnt = 0;
		var suji;

        var query = new AV.Query('HazureKaisu');
		query.descending('kaibetsu');
		query.limit(10);
        query.find().then(function (results) {
			for (var i = 0; i < results.length; i++) {
				object = results[i];
				output.l10 = output.l10 + object.get("l10");
				output.goukei = output.goukei + object.get("goukei");
				if ( i === 0 ) {
					for ( var j = 0; j < 43; j++ ) {
						suji = j + 1;
						if ( object.get(suji) < 11 ) {
							hotnum[hotcnt] = suji;
							hotcnt = hotcnt + 1;
						} else {
							coldnum[coldcnt] = suji;
							coldcnt = coldcnt + 1;
						}
					}
				}
			}
			var storage = localStorage;
			storage.setItem("hotnum", JSON.stringify(hotnum));
			var storage = localStorage;
			storage.setItem("hotcnt", hotcnt);
			var storage = localStorage;
			storage.setItem("coldnum", JSON.stringify(coldnum));
			var storage = localStorage;
			storage.setItem("coldcnt", coldcnt);

			console.log("lcSelHazureKaisuheikin end");
			resolve(output);
        }, function (error) {
            console.log("HazureKaisu Fetch NG "  + err);
            reject("HazureKaisu Fetch NG " + err);
        });
    });
};

var lcTousenBangoheikin = function() {
    return new Promise(function(resolve, reject) {

		console.log("lcTousenBangoheikin start");

		var output = {};
		var object;
		output.gusu = 0;
		output.dai = 0;
		output.goukei = 0;

        var query = new AV.Query('TousenBango');
		query.descending('kaibetsu');
		query.limit(10);
        query.find().then(function (results) {
			for (var i = 0; i < results.length; i++) {
				object = results[i];
				output.gusu = output.gusu + object.get("gusu");
				output.dai = output.dai + object.get("dai");
				output.goukei = output.goukei + object.get("goukei");
			}
			console.log("lcTousenBangoheikin end");
			resolve(output);
        }, function (error) {
            console.log("HazureKaisu Fetch NG "  + err);
            reject("HazureKaisu Fetch NG " + err);
        });
    });
};

var linji = function() {

	console.log("linji start");

	lcSelTousenBangolinji()
	  .then(kakusyukeisan)
	  .then(lcUpdTousenBangolinji)
	  .then(function(results) {
			console.log("linji OK");
			ons.notification.alert("正常終了！");
	})
      .catch(function(e) {
		console.log("linji NG　" + e);
        ons.notification.alert({
            title: '処理中止！',
            messageHTML: e,
            buttonLabel: 'OK',
            animation: 'default',
            callback: function() {
            }
        });
	});
};

var lcSelTousenBangolinji = function() {
    return new Promise(function(resolve, reject) {

		console.log("lcSelTousenBangolinji start");

		var output = {};

        var query = new AV.Query('TousenBango');
        query.find().then(function (results) {
			var object;
			for (var i = 0; i < results.length; i++) {
				object = results[i];
				output[i] = {};
				output[i].objectid   = object.get("objectId");
				output[i].hit1   = object.get("hit1");
				output[i].hit2   = object.get("hit2");
				output[i].hit3   = object.get("hit3");
				output[i].hit4   = object.get("hit4");
				output[i].hit5   = object.get("hit5");
				output[i].hit6   = object.get("hit6");
			}
			output[0].cnt = i
			console.log("lcSelTousenBangolinji end");
			resolve(output);
        }, function (error) {
            console.log("TousenBango Fetch NG "  + err);
            reject("TousenBango Fetch NG " + err);
        });
    });
};

var kakusyukeisan = function(arg) {
    return new Promise(function(resolve) {

		console.log("kakusyukeisan start");

		var gusu = 0;
		var dai = 0;
		var goukei = 0;

		var output = {};

		for ( var i = 0; i < arg[0].cnt; i++ ) {
			output[i] = {};

			output[i].objectid = arg[i].objectid;

			if ( arg[i].hit1 % 2 == 0 ) { gusu = gusu + 1; }
			if ( arg[i].hit2 % 2 == 0 ) { gusu = gusu + 1; }
			if ( arg[i].hit3 % 2 == 0 ) { gusu = gusu + 1; }
			if ( arg[i].hit4 % 2 == 0 ) { gusu = gusu + 1; }
			if ( arg[i].hit5 % 2 == 0 ) { gusu = gusu + 1; }
			if ( arg[i].hit6 % 2 == 0 ) { gusu = gusu + 1; }
			output[i].gusu = gusu;
			gusu = 0;

			if ( arg[i].hit1 > 22 ) { dai = dai + 1; }
			if ( arg[i].hit2 > 22 ) { dai = dai + 1; }
			if ( arg[i].hit3 > 22 ) { dai = dai + 1; }
			if ( arg[i].hit4 > 22 ) { dai = dai + 1; }
			if ( arg[i].hit5 > 22 ) { dai = dai + 1; }
			if ( arg[i].hit6 > 22 ) { dai = dai + 1; }
			output[i].dai = dai;
			dai = 0;

			goukei = arg[i].hit1 + arg[i].hit2 + arg[i].hit3 + arg[i].hit4 + arg[i].hit5 + arg[i].hit6;
			output[i].goukei = goukei;
			goukei = 0;
		}
		output[0].cnt = i
		console.log("kakusyukeisan end");
		resolve(output);
	});
};

var lcUpdTousenBangolinji = function(arg) {
    return new Promise(function(resolve2) {

		console.log("lcUpdTousenBangolinji start");

        var promises = [];
        var objectid;
		var gusu;
		var dai;
		var goukei;
        for (var i = 0; i < arg[0].cnt; i++ ) {
            objectid = arg[i].objectid;
            gusu = arg[i].gusu;
			dai = arg[i].dai;
			goukei = arg[i].goukei;
            promises.push(omotaiPromise(objectid, gusu, dai, goukei));
        }
        Promise.all(promises)
          .then(function (results) {
		    console.log("lcUpdTousenBangolinji end");
            resolve2(results);
        });
        function omotaiPromise(objectid, gusu, dai, goukei) {
            return new Promise(function (resolve1) {
		        var tousenbango = AV.Object.createWithoutData('TousenBango', objectid);
		        tousenbango.set('goukei', goukei);
		        tousenbango.set('gusu', gusu);
		        tousenbango.set('dai', dai);
		        tousenbango.save();
				resolve1();
    	    });
    	}
	});
};

var kumiawase = function() {

	console.log("kumiawase start");

	lcSelHazureKaisukumiawase()
	  .then(narabikae)
	  .then(function(results) {
			console.log("kumiawase end");
			ons.notification.alert("正常終了！");
	})
      .catch(function(e) {
		console.log("kumiawase NG　" + e);
        ons.notification.alert({
            title: '処理中止！',
            messageHTML: e,
            buttonLabel: 'OK',
            animation: 'default',
            callback: function() {
            }
        });
	});
};

var lcSelHazureKaisukumiawase = function(arg) {
    return new Promise(function(resolve, reject) {

		console.log("lcSelHazureKaisukumiawase end");

		var object;
		var hotnum = [];
		var hothaz = []
		var hotcnt = 0;
		var coldnum = [];
		var coldhaz = [];
		var coldcnt = 0;
		var suji;

	    var query = new AV.Query('HazureKaisu');
		query.descending('kaibetsu');
		query.limit(1);
	    query.find().then(function (results) {
			object = results[0];
			for ( var j = 0; j < 43; j++ ) {
				suji = j + 1;
				if ( object.get(suji) < 11 ) {
					hotnum[hotcnt] = suji;
					hothaz[hotcnt] = object.get(suji);
					hotcnt = hotcnt + 1;
				} else {
					coldnum[coldcnt] = suji;
					coldhaz[coldcnt] = object.get(suji);
					coldcnt = coldcnt + 1;
				}
			}
			var storage1 = localStorage;
			storage1.setItem("hotnum", JSON.stringify(hotnum));
			var storage2 = localStorage;
			storage2.setItem("hotcnt", hotcnt);
			var storage3 = localStorage;
			storage3.setItem("coldnum", JSON.stringify(coldnum));
			var storage4 = localStorage;
			storage4.setItem("coldcnt", coldcnt);
			var storage5 = localStorage;
			storage5.setItem("hothaz", JSON.stringify(hothaz));
			var storage6 = localStorage;
			storage6.setItem("coldhaz", JSON.stringify(coldhaz));

			console.log("lcSelHazureKaisukumiawase end");
			resolve();
	    }, function (error) {
	        console.log("HazureKaisu Fetch NG "  + err);
	        reject("HazureKaisu Fetch NG " + err);
	    });
	});
};

var narabikae = function() {
    return new Promise(function(resolve) {

	console.log("narabikae start");

	var storage = localStorage;
	var str = storage.getItem("hotnum");
	var hotnum = JSON.parse(str);
	var hotcnt = storage.getItem("hotcnt");
	str = storage.getItem("coldnum");
	var coldnum = JSON.parse(str);
	var coldcnt = storage.getItem("coldcnt");
	str = storage.getItem("hothaz");
	var hothaz = JSON.parse(str);
	str = storage.getItem("coldhaz");
	var coldhaz = JSON.parse(str);
	
	console.log("hotcnt, coldcnt = " + hotcnt + ", " + coldcnt);

	for ( var i = 0; i < hotcnt; i++ ) {
		console.log("HotNum : HazNum " + hotnum[i] + ":" + hothaz[i]);
	}
	for ( i = 0; i < coldcnt; i++ ) {
		console.log("ColdNum : HazNum " + coldnum[i] + ":" + coldhaz[i]);
	}

	/*
	var i = 0;
	var flg = false;
	var cnt = 0;
	var kumi = [];
	var koho = [];
	while ( flg === false ) {
		
		koho[0] = hotnum[i];
		koho[1] = hotnum[i+1];
		koho[2] = hotnum[i+2];
		koho[3] = hotnum[i+3];
		koho[4] = hotnum[i+4];
		koho[5] = coldnum[i];

		i = i + 1;
	}
	*/
	console.log("narabikae end");
	resolve;

	});
};

var yosou = function() {

	console.log("yosou start");

	var gusu = 0;
	var dai = 0;
	var goukei = 0;

	var r1 = Math.random();
	var daiflg = false;	

	while ( daiflg === false ) {
		var flg = false;
		var hit1 = Math.floor( r1*43+1 );
		var hit2 = Math.floor( r1*43+1 );
		while ( flg === false ) {
			if ( hit2 != hit1 ) {
				flg = true;
			} else {
				r1 = Math.random();
				hit2 = Math.floor( r1*43+1 );
			}
		}
		flg = false;
		var hit3 = Math.floor( r1*43+1 );
		while ( flg === false ) {
			if ( hit3 != hit1 && hit3 != hit2 ) {
				flg = true;
			} else {
				r1 = Math.random();
				hit3 = Math.floor( r1*43+1 );
			}
		}
		flg = false;
		var hit4 = Math.floor( r1*43+1 );
		while ( flg === false ) {
			if ( hit4 != hit1 && hit4 != hit2 && hit4 != hit3 ) {
				flg = true;
			} else {
				r1 = Math.random();
				hit4 = Math.floor( r1*43+1 );
			}
		}
		flg = false;
		var hit5 = Math.floor( r1*43+1 );
		while ( flg === false ) {
			if ( hit5 != hit1 && hit5 != hit2 && hit5 != hit3 && hit5 != hit4 ) {
				flg = true;
			} else {
				r1 = Math.random();
				hit5 = Math.floor( r1*43+1 );
			}
		}
		flg = false;
		var hit6 = Math.floor( r1*43+1 );
		while ( flg === false ) {
			if ( hit6 != hit1 && hit6 != hit2 && hit6 != hit3 && hit6 != hit4 && hit6 != hit5 ) {
				flg = true;
			} else {
				r1 = Math.random();
				hit6 = Math.floor( r1*43+1 );
			}
		}

		gusu = 0;
		dai = 0;
		goukei = 0;

		if ( hit1 % 2 == 0 ) { gusu = gusu + 1; }
		if ( hit2 % 2 == 0 ) { gusu = gusu + 1; }
		if ( hit3 % 2 == 0 ) { gusu = gusu + 1; }
		if ( hit4 % 2 == 0 ) { gusu = gusu + 1; }
		if ( hit5 % 2 == 0 ) { gusu = gusu + 1; }
		if ( hit6 % 2 == 0 ) { gusu = gusu + 1; }

		if ( hit1 > 22 ) { dai = dai + 1; }
		if ( hit2 > 22 ) { dai = dai + 1; }
		if ( hit3 > 22 ) { dai = dai + 1; }
		if ( hit4 > 22 ) { dai = dai + 1; }
		if ( hit5 > 22 ) { dai = dai + 1; }
		if ( hit6 > 22 ) { dai = dai + 1; }

		goukei = hit1 + hit2 + hit3 + hit4 + hit5 + hit6;

		if ( gusu > 1 && gusu < 5 ) {
			if ( dai > 1 && dai < 5 ) {
				if ( goukei > 119 && goukei < 161 ) {
					daiflg = true;
				}
			}
		}
	}

	console.log(hit1, hit2, hit3, hit4, hit5, hit6);

	var output = [];
	output[0] = hit1;
	output[1] = hit2;
	output[2] = hit3;
	output[3] = hit4;
	output[4] = hit5;
	output[5] = hit6;

	output.sort(function(a,b){
  		return a-b;
	});
	//console.log(output);

    var promises = [
        lcSelHazureKaisuheikin(),
        lcTousenBangoheikin(),
		lcSelHazureKaisuyosou(output)
    ];
    Promise.all(promises)
	  .then(function(results) {
			var goukeiheikin = results[0].goukei / 10;
			var l10heikin = results[0].l10 / 10;
			var gusuheikin = results[1].gusu / 10;
			var daiheikin = results[1].dai / 10;
			var goukei2heikin = results[1].goukei / 10;
			console.log("yosou end");
	        ons.notification.alert({
	            title: output[0] + ' ' + output[1] + ' ' + output[2] + ' ' + output[3] + ' ' + output[4] + ' ' + output[5],
	            messageHTML: '<BR>入力数値はずれ回数合計：' + results[2].haznum + '<BR>' + '　はずれ回数合計平均：' + goukeiheikin + '<BR><BR>' + 'ホットナンバー：' + results[2].hotcnt + '<BR>' + '　Ｌ１０平均：' + l10heikin + '<BR><BR>' + '偶数値：' + gusu + '<BR>' + '　偶数平均：' + gusuheikin + '<BR><BR>' + '大数値：' + dai + '<BR>' + '　大数値平均：' + daiheikin + '<BR><BR>' + '合計：' + goukei + '<BR>' + '　合計平均：' + goukei2heikin,
	            buttonLabel: 'OK',
				modifier: 'tokubetsu',
	            animation: 'default',
	            callback: function() {
	            }
	        });
	})
      .catch(function(e) {
		console.log("yosou NG　" + e);
        ons.notification.alert({
            title: '処理中止！',
            messageHTML: e,
            buttonLabel: 'OK',
            animation: 'default',
            callback: function() {
            }
        });
	});
};

var lcSelHazureKaisuyosou = function(arg) {
    return new Promise(function(resolve, reject) {

		console.log("lcSelHazureKaisuyosou start");

		var object;
		var output = {};
		var hotnum = [];
		output.hotcnt = 0;

        var query = new AV.Query('HazureKaisu');
		query.descending('kaibetsu');
		query.limit(1);
        query.find().then(function (results) {
			object = results[0];
			output.haz1 = object.get(arg[0]);
			output.haz2 = object.get(arg[1]);
			output.haz3 = object.get(arg[2]);
			output.haz4 = object.get(arg[3]);
			output.haz5 = object.get(arg[4]);
			output.haz6 = object.get(arg[5]);

			if ( output.haz1 < 11 ) output.hotcnt = output.hotcnt + 1;
			if ( output.haz2 < 11 ) output.hotcnt = output.hotcnt + 1;
			if ( output.haz3 < 11 ) output.hotcnt = output.hotcnt + 1;
			if ( output.haz4 < 11 ) output.hotcnt = output.hotcnt + 1;
			if ( output.haz5 < 11 ) output.hotcnt = output.hotcnt + 1;
			if ( output.haz6 < 11 ) output.hotcnt = output.hotcnt + 1;

			output.haznum = output.haz1 + output.haz2 + output.haz3 + output.haz4 + output.haz5 + output.haz6;
			/*
			output.l10 = output.l10 + object.get("l10");
			output.goukei = output.goukei + object.get("goukei");
			if ( i === 0 ) {
				for ( var j = 0; j < 43; j++ ) {
					suji = j + 1;
					if ( object.get(suji) < 11 ) {
						hotnum[hotcnt] = suji;
						hotcnt = hotcnt + 1;
					} else {
						coldnum[coldcnt] = suji;
						coldcnt = coldcnt + 1;
					}
				}
			}
			*/
			console.log("lcSelHazureKaisuyosou end");
			resolve(output);
        }, function (error) {
            console.log("HazureKaisu Fetch NG "  + error);
            reject("HazureKaisu Fetch NG " + error);
        });
    });
};
