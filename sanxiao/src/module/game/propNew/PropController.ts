/**
 * Created by HuDe Zheng on 2018/7/17.
 */
class PropController extends BaseController
{
    private propView:PropNewView
    private previousItem:PropNewItem;//前一个被选中的item
    public constructor() {
        super();
        this.propView = new PropNewView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.Prop, this.propView);

        App.MessageCenter.addListener(Msg.Event.SelectProp,this.selectPropHandler,this);
        App.MessageCenter.addListener(Msg.Event.CancelSelectProp,this.cancelSelectProp,this);//取消选择道具
        App.MessageCenter.addListener(Msg.Event.UseProp,this.useProp,this);//使用道具事件 更新道具数量

    }
    //更新道具数量
    public useProp(propId:number,type:number = 0,num:number = 1,isAddUsedToolTimes=true)
    {
        if(isAddUsedToolTimes){
            TG_Game.getInstance().usedToolTimes++;
        }
         this.propView.useProp(propId,type,num);
         // App.TimerManager.doTimer(2000, 0, TG_Game.getInstance().doDrop(), this)
         // TG_Game.getInstance().doCheckMoved();
    }
    public getItems(arr:Array<any>,id:number)
    {
        for(let i = 0;i < arr.length;i ++)
        {
            if(id == arr[i]["id"])
            {
                return arr[i]["num"];
            }
        }
        return 0;
    }
    public cancelSelectProp(item:PropNewItem)
    {
        if(item) {
            item.filters = [];
            this.previousItem = null;
        }
    }
    /**
     *  被点击道具
     * @param item
     */
    private selectPropHandler(item:PropNewItem):void
    {
        let type = item.type;//道具类型
        let gl:egret.GlowFilter = new egret.GlowFilter(0xff0000,1,10,10);
        if(this.previousItem)
        {
            this.previousItem.filters = [];
        }
        if(this.previousItem == item) {
            this.previousItem = null;

            //取消选择道具
            return;
        }
        item.filters = [gl];
        this.previousItem = item;
    }
}
