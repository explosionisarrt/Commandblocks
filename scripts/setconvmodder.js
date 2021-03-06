

var t=this;
const resetspeed=0.2;
const speedmul=0.1;

t.global.setconvload=false;
t.global.setconvspeed=resetspeed;
t.global.setconvchanged=false;
t.global.setconvchangeda=false;

const setconvmodder = extendContent(MessageBlock, "setconvmodder", {
  buildConfiguration(tile, table){
    this.super$buildConfiguration(tile,table);
/*
		table.addImageButton(Icon.undo, run(() => {

			this.setMessageBlockText(null,tile,resetspeed+"");
      t.global.setconvspeed=resetspeed;
      t.global.setconvload=true;
      t.global.setconvchanged=true;
      t.global.setconvchangeda=true;
		})).size(40);
*/
		var myslider=table.addSlider(0,6,0.01,t.global.setconvspeed,null).width(240).get();
		//myslider.setStyle(Styles.vSlider);
		//myslider.width(240);
		myslider.changed(run(() => {

			Call.setMessageBlockText(null,tile,myslider.getValue().toFixed(2)+"");
			t.global.setconvspeed=myslider.getValue().toFixed(2);
			t.global.setconvload=true;
      			t.global.setconvchanged=true;
      			t.global.setconvchangeda=true;
		}));
		//update말고 changed도?
	},
  placed(tile) {
		this.super$placed(tile);
    Call.setMessageBlockText(null,tile,resetspeed+"");
	},
  drawSelect(tile){
    this.drawPlaceText(tile.ent().message,tile.x,tile.y,true);
  },
  updateTableAlign(tile,table){
    var pos = Core.input.mouseScreen(tile.drawx(), tile.drawy() - tile.block().size * Vars.tilesize / 2 - 1);
    table.setPosition(pos.x, pos.y, Align.top);
  },
  update(tile){
    var n=Number(tile.ent().message);
    if(!t.global.setconvload){
      t.global.setconvspeed=n;
      t.global.setconvload=true;
      t.global.setconvchanged=true;
      t.global.setconvchangeda=true;
    }
    if(Math.floor(t.global.setconvspeed*10000)!=Math.floor(n*10000)){
      t.global.setconvchanged=true;
      t.global.setconvchangeda=true;
      t.global.setconvspeed=n;
    }
  },
  draw(tile){
    var i=Math.floor(Time.time() * t.global.setconvspeed * 8.0 * speedmul) % 4;
    if(i<0) i=Math.abs(i)%4;
    var n=Number(tile.ent().message);
    //print(n);
    Draw.rect(Core.atlas.find(this.name.substring(0,this.name.length-6)+"-0-"+i), tile.drawx(), tile.drawy());
    Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
  }
});
