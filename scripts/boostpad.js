const presstick=20; const timerid=0; const blocksize=Vars.tilesize;
const animspeed=40;
const boostpad = extendContent(Block, "boostpad", {
  placed(tile) {
    this.super$placed(tile);
    tile.ent().timer.reset(timerid,presstick+1);
  },
  draw(tile) {
    Draw.rect(this.animRegion[Mathf.floorPositive((Time.time()%160)/animspeed)], tile.drawx(), tile.drawy());
    if(!tile.ent().timer.check(timerid,presstick)){
      Draw.alpha((presstick-tile.ent().timer.getTime(timerid))/presstick);
      Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
      Draw.color();
    }
  },
  unitOn(tile,unit){
    if(tile.ent().timer.check(timerid,presstick)) Sounds.place.at(tile.worldx(),tile.worldy());
    tile.ent().timer.reset(timerid,0);
  },
  update(tile){
    this.super$update(tile);
    Units.nearby(tile.worldx(),tile.worldy(),blocksize,blocksize,cons(e => {
      this.unitOn(tile,e);
    }));
  },
  load(){
    this.super$load();
    this.animRegion=[];
    for(var i=0;i<4;i++){
      this.animRegion.push(Core.atlas.find(this.name+"-"+i));
    }
    this.topRegion=Core.atlas.find(this.name+"-top");
  }
});
