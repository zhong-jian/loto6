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
				if ( i === 0 ) {
					output.saisin = [];
					output.saisin[0] = object.get("hit1");
					output.saisin[1] = object.get("hit2");
					output.saisin[2] = object.get("hit3");
					output.saisin[3] = object.get("hit4");
					output.saisin[4] = object.get("hit5");
					output.saisin[5] = object.get("hit6");
				}
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
		lcSelHazureKaisuyosou(output),
		lcShimohitoketaSel(),
		lcHippariSujiSel(),
		lcKatayoriChartSel()
    ];
    Promise.all(promises)
	  .then(function(results) {
			var goukeiheikin = results[0].goukei / 10;
			var l10heikin = results[0].l10 / 10;
			var gusuheikin = results[1].gusu / 10;
			var daiheikin = results[1].dai / 10;
			var goukei2heikin = results[1].goukei / 10;
			var shimohitoketa = "";
			var katayori = "";
			for (var i = 0; i < results[3].numcnt; i++ ) {
				shimohitoketa = shimohitoketa + results[3].num[i];
				if ( i != results[3].numcnt - 1) {
					shimohitoketa = shimohitoketa + ", ";
				}
			}
			var arunashi = "なし";
			if (results[4] == true) { arunashi = "あり"; }
			console.log("results[5].numcnt = " + results[5].numcnt);
			for (var i = 0; i < results[5].numcnt; i++ ) {
				katayori = katayori + results[5].num[i];
				if ( i != results[5].numcnt - 1) {
					katayori = katayori + ", ";
				}
			}
			console.log("yosou end");
	        ons.notification.alert({
	            title: output[0] + ' ' + output[1] + ' ' + output[2] + ' ' + output[3] + ' ' + output[4] + ' ' + output[5],
	            messageHTML: '<BR>入力数値はずれ回数合計：' + results[2].haznum + '<BR>' + '　はずれ回数合計平均：' + goukeiheikin + '<BR><BR>' + 'ホットナンバー：' + results[2].hotcnt + '<BR>' + '　Ｌ１０平均：' + l10heikin + '<BR><BR>' + '偶数値：' + gusu + '<BR>' + '　偶数平均：' + gusuheikin + '<BR><BR>' + '大数値：' + dai + '<BR>' + '　大数値平均：' + daiheikin + '<BR><BR>' + '合計：' + goukei + '<BR>' + '　合計平均：' + goukei2heikin + '<BR><BR>' + '　下一桁：' + shimohitoketa + '<BR><BR>' + '　前回当選番号：' + results[1].saisin[0] + ', ' + results[1].saisin[1] + ', ' + results[1].saisin[2] + ', ' + results[1].saisin[3] + ', ' + results[1].saisin[4] + ', ' + results[1].saisin[5] + '<BR>' + '　前回引っ張り：' + arunashi + '<BR><BR>' + '　偏りチャート：' + katayori,
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

var lcShimohitoketaSel = function() {
    return new Promise(function(resolve, reject) {

		console.log("lcShimohitoketaSel start");

		var object;
		var output = [];

		var shimoMAX = {};
		shimoMAX.num = [];
		var cnt = 0;

        var query = new AV.Query('ShimohitoketaTable');
		query.limit(1);
        query.find().then(function (results) {
			object = results[0];

			output[0] = object.get("s0");
			output[1] = object.get("s1");
			output[2] = object.get("s2");
			output[3] = object.get("s3");
			output[4] = object.get("s4");
			output[5] = object.get("s5");
			output[6] = object.get("s6");
			output[7] = object.get("s7");
			output[8] = object.get("s8");
			output[9] = object.get("s9");

			for ( i = 0; i < 10; i++ ) {
				if ( i === 0 ) {
					shimoMAX.cnt = output[i];
					shimoMAX.num[cnt] = i;
					cnt = cnt + 1;
				} else {
					if ( shimoMAX.cnt < output[i] ) {
						cnt = 0;
						shimoMAX.cnt = output[i];
						shimoMAX.num[cnt] = i;
						cnt = cnt + 1;
					} else if ( shimoMAX.cnt === output[i] ) {
						shimoMAX.num[cnt] = i;
						cnt = cnt + 1;
					}
				}
			}
			shimoMAX.numcnt = cnt;

			console.log("lcShimohitoketaSel end");
			resolve(shimoMAX);
        }, function (error) {
            console.log("ShimohitoketaTable Fetch NG "  + error);
            reject("ShimohitoketaTable Fetch NG " + error);
        });
    });
};

var lcHippariSujiSel = function() {
    return new Promise(function(resolve, reject) {

		console.log("lcHippariSujiSel start");

		var object;
		var flg;

        var query = new AV.Query('HippariSuji');
		query.limit(1);
        query.find().then(function (results) {
			object = results[0];

			flg = object.get("flg");
			console.log("flg = " + flg);

			console.log("lcHippariSujiSel end");
			resolve(flg);
        }, function (error) {
            console.log("HippariSuji Fetch NG "  + error);
            reject("HippariSuji Fetch NG " + error);
        });
    });
};

var lcKatayoriChartSel = function() {
    return new Promise(function(resolve, reject) {

		console.log("lcKatayoriChartSel start");

		var object;
		var output = [];

		var katayoriMAX = {};
		katayoriMAX.num = [];
		var cnt = 0;
		var grp = [];

        var query = new AV.Query('KatayoriChart');
		query.limit(1);
        query.find().then(function (results) {
			object = results[0];

			output[0] = object.get("k01_07");
			output[1] = object.get("k08_14");
			output[2] = object.get("k15_22");
			output[3] = object.get("k23_29");
			output[4] = object.get("k30_36");
			output[5] = object.get("k37_43");

			grp[0] = "1-7";
			grp[1] = "8-14";
			grp[2] = "15-22";
			grp[3] = "23-29";
			grp[4] = "30-36";
			grp[5] = "37-43";

			for ( i = 0; i < 6; i++ ) {
				if ( i === 0 ) {
					katayoriMAX.cnt = output[i];
					katayoriMAX.num[cnt] = grp[i];
					cnt = cnt + 1;
				} else {
					if ( katayoriMAX.cnt < output[i] ) {
						cnt = 0;
						katayoriMAX.cnt = output[i];
						katayoriMAX.num[cnt] = grp[i];
						cnt = cnt + 1;
					} else if ( katayoriMAX.cnt === output[i] ) {
						katayoriMAX.num[cnt] = grp[i];
						cnt = cnt + 1;
					}
				}
			}
			katayoriMAX.numcnt = cnt;

			console.log("lcKatayoriChartSel end");
			resolve(katayoriMAX);
        }, function (error) {
            console.log("KatayoriChart Fetch NG "  + error);
            reject("KatayoriChart Fetch NG " + error);
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

var shimohitoketa = function() {

/*
	下一桁数字の当選期間を保存する。
*/

	lcfindShimohitoketa()
	  .then(lccheckTousenBango2)
	  .then(SHTBtotugou)
	  .then(lcUpdShimohitoketa)
	  .then(function(results) {
			console.log("shimohitoketa OK");
			ons.notification.alert("正常終了！");
	})
      .catch(function(e) {
		console.log("shimohitoketa NG　" + e);
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

var lcfindShimohitoketa = function() {
    return new Promise(function(resolve, reject) {

		var output = {};

        var query = new AV.Query('ShimohitoketaTable');
        query.find().then(function (results) {
            var object = results[0];
			output.objectid = object.get("objectId")
            output.kaibetsu = object.get("kaibetsu");
            output.s0  = object.get("s0");
            output.s1  = object.get("s1");
            output.s2  = object.get("s2");
            output.s3  = object.get("s3");
            output.s4  = object.get("s4");
            output.s5  = object.get("s5");
            output.s6  = object.get("s6");
            output.s7  = object.get("s7");
            output.s8  = object.get("s8");
            output.s9  = object.get("s9");

			console.log("kaibetsu = " + output.kaibetsu);

			var storage = localStorage;
			storage.setItem("SHIMOHITOKETA", JSON.stringify(output));

            resolve();
            console.log("ShimohitoketaTable Fetch OK");
        }, function (error) {
            console.log("ShimohitoketaTable Fetch NG "  + err);
            reject("ShimohitoketaTable Fetch NG " + err);
        });

    });
};

var lccheckTousenBango2 = function() {
    return new Promise(function(resolve, reject) {

		console.log("lccheckTousenBango2 start");
		var storage = localStorage;
		var str = storage.getItem("SHIMOHITOKETA");
		var input = JSON.parse(str);

		var output = {};

		var kaibetsu;

        var query = new AV.Query('TousenBango');
		query.descending('kaibetsu');
        query.find().then(function (results) {
            var object = results[0];
            kaibetsu = object.get("kaibetsu");
			console.log("TB kaibetsu = " + kaibetsu);
			console.log("SH input.kaibetsu = " + input.kaibetsu);
			if ( kaibetsu === input.kaibetsu ) {
				reject("下一桁数字は最新の状態です。");
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
					output[i].kaibetsu = object.get("kaibetsu");
					console.log("output[" + i + "].kaibetsu = " + output[i].kaibetsu);
				}
				console.log("lccheckTousenBango2 end");
				resolve(output);
			}
        }, function (error) {
            console.log("TousenBango Fetch NG "  + err);
            reject("TousenBango Fetch NG " + err);
        });
    });
};

var SHTBtotugou = function(tousenbango) {	
    return new Promise(function(resolve, reject) {

		console.log("SHTBtotugou start");
		var storage = localStorage;
		var str = storage.getItem("SHIMOHITOKETA");
		var output = JSON.parse(str);

        var promises = [];
        var objectid;
		var suji;
        for (var i = tousenbango.klength - 1; i >= 0; i-- ) {
            output.kaibetsu = output.kaibetsu + 1;

			var shimo1 = tousenbango[i].hit1;
			if ( String(shimo1).length != 1 ) shimo1 = Number(String(shimo1).substr(1,1));
			var shimo2 = tousenbango[i].hit2;

			console.log("tousenbango[" + i + "].hit2 = " + tousenbango[i].hit2);
			console.log("String(shimo2).length = " + String(shimo2).length);

			if ( String(shimo2).length != 1 ) shimo2 = Number(String(shimo2).substr(1,1));
			var shimo3 = tousenbango[i].hit3;
			if ( String(shimo3).length != 1 ) shimo3 = Number(String(shimo3).substr(1,1));
			var shimo4 = tousenbango[i].hit4;
			if ( String(shimo4).length != 1 ) shimo4 = Number(String(shimo4).substr(1,1));
			var shimo5 = tousenbango[i].hit5;
			if ( String(shimo5).length != 1 ) shimo5 = Number(String(shimo5).substr(1,1));
			var shimo6 = tousenbango[i].hit6;
			if ( String(shimo6).length != 1 ) shimo6 = Number(String(shimo6).substr(1,1));

			for (var j = 0; j < 10; j++) {
				suji = j;

				switch (suji) {
					case shimo1:
						output['s' + suji] = 0; break;
					case shimo2:
						output['s' + suji] = 0; break;
					case shimo3:
						output['s' + suji] = 0; break;
					case shimo4:
						output['s' + suji] = 0; break;
					case shimo5:
						output['s' + suji] = 0; break;
					case shimo6:
						output['s' + suji] = 0; break;
					default:
						output['s' + suji] = output['s' + suji] + 1; break;
				}
			}
        }
		console.log("SHTBtotugou end");
        resolve(output);
    });
};

var lcUpdShimohitoketa = function(output) {
    return new Promise(function(resolve, reject) {

		console.log("lcUpdShimohitoketa start");
		console.log("output.objectid = " + output.objectid);
		console.log("output.kaibetsu = " + output.kaibetsu);
		console.log("output.s0 = " + output.s0);
		console.log("output.s1 = " + output.s1);
		console.log("output.s2 = " + output.s2);
		console.log("output.s3 = " + output.s3);
		console.log("output.s4 = " + output.s4);
		console.log("output.s5 = " + output.s5);
		console.log("output.s6 = " + output.s6);
		console.log("output.s7 = " + output.s7);
		console.log("output.s8 = " + output.s8);
		console.log("output.s9 = " + output.s9);

        var shimohitoketa = AV.Object.createWithoutData('ShimohitoketaTable', output.objectid);
/*
		var acl = new AV.ACL();
		acl.setPublicReadAccess(true);
		acl.setWriteAccess("*", true);

		shimohitoketa.setACL(acl);
*/
        shimohitoketa.set('s1', output.s1);
        shimohitoketa.set('s2', output.s2);
        shimohitoketa.set('s3', output.s3);
        shimohitoketa.set('s4', output.s4);
        shimohitoketa.set('s5', output.s5);
        shimohitoketa.set('s6', output.s6);
        shimohitoketa.set('s7', output.s7);
        shimohitoketa.set('s8', output.s8);
        shimohitoketa.set('s9', output.s9);
        shimohitoketa.set('s0', output.s0);
        shimohitoketa.set('kaibetsu', output.kaibetsu);

        shimohitoketa.save();
		resolve();
    });
};

var hippari = function() {

	lcfindTousenBango()
	  .then(lcUpdHippariSuji)
	  .then(function(results) {
			console.log("hippai OK");
			ons.notification.alert("正常終了！");
	})
      .catch(function(e) {
		console.log("hippari NG　" + e);
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

var lcfindTousenBango = function() {
    return new Promise(function(resolve, reject) {

		console.log("lcfindTousenBango start");

		var output = {};
		var kaibetsu;

        var query = new AV.Query('TousenBango');
		query.descending('kaibetsu');
		query.limit(2);
        query.find().then(function (results) {
            var object;
			var hithip1 = [];
			var hithip2 = [];
			var flg = false;

            object = results[0];
			hithip1[0] = object.get("hit1");
			hithip1[1] = object.get("hit2");
			hithip1[2] = object.get("hit3");
			hithip1[3] = object.get("hit4");
			hithip1[4] = object.get("hit5");
			hithip1[5] = object.get("hit6");

            object = results[1];
			hithip2[0] = object.get("hit1");
			hithip2[1] = object.get("hit2");
			hithip2[2] = object.get("hit3");
			hithip2[3] = object.get("hit4");
			hithip2[4] = object.get("hit5");
			hithip2[5] = object.get("hit6");

			for (var i = 0; i < 6; i++) {
				for (var j = 0; j < 6; j++) {
					if ( hithip1[i] === hithip2[j] ) {
						flg = true;
					}
				}
			}
			resolve(flg);
        }, function (error) {
            console.log("TousenBango Fetch NG "  + err);
            reject("TousenBango Fetch NG " + err);
        });
    });
};

var lcUpdHippariSuji = function(input) {
    return new Promise(function(resolve, reject) {

		console.log("lcUpdHippariSuji start");
		console.log("input = " + input);
		var objectid = "5aab655b9f5454250d8230df";

        var hipparisuji = AV.Object.createWithoutData('HippariSuji', objectid);
        hipparisuji.set('flg', input);
        hipparisuji.save();
		console.log("lcUpdHippariSuji end");
		resolve();
    });
};

var katayori = function() {

/*
	偏り具合を更新する。
*/

	lcfindKatayoriChart()
	  .then(lccheckTousenBango3)
	  .then(KCTBtotugou)
	  .then(lcUpdKatayoriChart)
	  .then(function(results) {
			console.log("katayori OK");
			ons.notification.alert("正常終了！");
	})
      .catch(function(e) {
		console.log("katayori NG　" + e);
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

var lcfindKatayoriChart = function() {
    return new Promise(function(resolve, reject) {

		var output = {};

        var query = new AV.Query('KatayoriChart');
        query.find().then(function (results) {
            var object = results[0];
			output.objectid = object.get("objectId")
            output.kaibetsu = object.get("kaibetsu");
            output.k01_07  = object.get("k01_07");
            output.k08_14  = object.get("k08_14");
            output.k15_22  = object.get("k15_22");
            output.k23_29  = object.get("k23_29");
            output.k30_36  = object.get("k30_36");
            output.k37_43  = object.get("k37_43");

			console.log("kaibetsu = " + output.kaibetsu);

			var storage = localStorage;
			storage.setItem("KATAYORI", JSON.stringify(output));

            resolve();
            console.log("KatayoriChart Fetch OK");
        }, function (error) {
            console.log("KatayoriChart Fetch NG "  + err);
            reject("KatayoriChart Fetch NG " + err);
        });

    });
};

var lccheckTousenBango3 = function() {
    return new Promise(function(resolve, reject) {

		console.log("lccheckTousenBango3 start");
		var storage = localStorage;
		var str = storage.getItem("KATAYORI");
		var input = JSON.parse(str);

		var output = {};

		var kaibetsu;

        var query = new AV.Query('TousenBango');
		query.descending('kaibetsu');
        query.find().then(function (results) {
            var object = results[0];
            kaibetsu = object.get("kaibetsu");
			console.log("TB kaibetsu = " + kaibetsu);
			console.log("KC input.kaibetsu = " + input.kaibetsu);
			if ( kaibetsu === input.kaibetsu ) {
				reject("偏りチャートは最新の状態です。");
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
					output[i].kaibetsu = object.get("kaibetsu");
					console.log("output[" + i + "].kaibetsu = " + output[i].kaibetsu);
				}
				console.log("lccheckTousenBango3 end");
				resolve(output);
			}
        }, function (error) {
            console.log("TousenBango Fetch NG "  + err);
            reject("TousenBango Fetch NG " + err);
        });
    });
};

var KCTBtotugou = function(tousenbango) {	
    return new Promise(function(resolve, reject) {

		console.log("KCTBtotugou start");
		var storage = localStorage;
		var str = storage.getItem("KATAYORI");
		var output = JSON.parse(str);

        var promises = [];
        var objectid;
		var suji;

		var tousen = [];

        for (var i = tousenbango.klength - 1; i >= 0; i-- ) {
            output.kaibetsu = output.kaibetsu + 1;

			tousen[0] = tousenbango[i].hit1;
			tousen[1] = tousenbango[i].hit2;
			tousen[2] = tousenbango[i].hit3;
			tousen[3] = tousenbango[i].hit4;
			tousen[4] = tousenbango[i].hit5;
			tousen[5] = tousenbango[i].hit6;

			output.k01_07 = output.k01_07 + 1;
			output.k08_14 = output.k08_14 + 1;
			output.k15_22 = output.k15_22 + 1;
			output.k23_29 = output.k23_29 + 1;
			output.k30_36 = output.k30_36 + 1;
			output.k37_43 = output.k37_43 + 1;

			for (var j = 0; j < 6; j++) {
				if ( tousen[j] >= 1  && tousen[j] <= 7  ) output.k01_07 = 0;
				if ( tousen[j] >= 8  && tousen[j] <= 14 ) output.k08_14 = 0;
				if ( tousen[j] >= 15 && tousen[j] <= 22 ) output.k15_22 = 0;
				if ( tousen[j] >= 23 && tousen[j] <= 29 ) output.k23_29 = 0;
				if ( tousen[j] >= 30 && tousen[j] <= 36 ) output.k30_36 = 0;
				if ( tousen[j] >= 37 && tousen[j] <= 43 ) output.k37_43 = 0;
			}
        }
		console.log("KCTBtotugou end");
        resolve(output);
    });
};

var lcUpdKatayoriChart = function(output) {
    return new Promise(function(resolve, reject) {

		console.log("lcUpdKatayoriChart start");
		console.log("output.objectid = " + output.objectid);
		console.log("output.kaibetsu = " + output.kaibetsu);
		console.log("output.k01_07 = " + output.k01_07);
		console.log("output.k08_14 = " + output.k08_14);
		console.log("output.k15_22 = " + output.k15_22);
		console.log("output.k23_29 = " + output.k23_29);
		console.log("output.k30_36 = " + output.k30_36);
		console.log("output.k37_43 = " + output.k37_43);

        var katayorichart = AV.Object.createWithoutData('KatayoriChart', output.objectid);
/*
		var acl = new AV.ACL();
		acl.setPublicReadAccess(true);
		acl.setWriteAccess("*", true);

		shimohitoketa.setACL(acl);
*/
        katayorichart.set('k01_07', output.k01_07);
        katayorichart.set('k08_14', output.k08_14);
        katayorichart.set('k15_22', output.k15_22);
        katayorichart.set('k23_29', output.k23_29);
        katayorichart.set('k30_36', output.k30_36);
        katayorichart.set('k37_43', output.k37_43);
        katayorichart.set('kaibetsu', output.kaibetsu);

        katayorichart.save();
		resolve();
    });
};

