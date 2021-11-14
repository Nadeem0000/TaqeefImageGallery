import * as React from 'react';
import styles from './PicGallery.module.scss';
import { IPicGalleryProps } from './IPicGalleryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from 'jquery';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Web } from "@pnp/sp/webs";


SPComponentLoader.loadCss(`https://fonts.googleapis.com/css?family=Roboto:300,400,500,700`);           
SPComponentLoader.loadCss(`https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`);   
SPComponentLoader.loadCss(`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css`); 
SPComponentLoader.loadCss(`https://tmxin.sharepoint.com/sites/POC/PracticeSite/SiteAssets/PicGallery/css/style.css`);

export interface IPicGalleryState {  
  Galleryitems:any[];  
}

var FolderNames = [];
var FolderNamesExits= [];

let MasterResult=[];






export default class PicGallery extends React.Component<IPicGalleryProps,IPicGalleryState, {}> {
  public constructor(props: IPicGalleryProps, state: IPicGalleryState) {
    super(props);
    this.state = {
      Galleryitems: [],
    };
  }


  public componentDidMount(){               
    this.GetGalleryFilesFolder(); 
  }

  const NewWeb = Web("https://tmxin.sharepoint.com/sites/POC/taqeefIntranet/Definitions/"); 
  public GetGalleryFilesFolder(){    
    // var reactHandler = this;
    //         $.ajax({
    //             url: `${reactHandler.props.siteurl}/_api/Web/Lists/getByTitle('PracticePictureLibrary')/items?$expand=Folder,File&$top=1000&$orderby=Created desc&$select=ID,Title,FileRef,FileSystemObjectType,FileLeafRef,Folder/ServerRelativeUrl,Folder/Name`,// URL to fetch data from sharepoint Picture Library                
    //             method: "GET",  
    //             headers: {
    //                 "accept": "application/json;odata=verbose",    
    //                 "content-type": "application/json;odata=verbose"    
    //             },
    //             success: function(resultData) {                                                      
    //               if(resultData.d.results.length != 0){
    //                 reactHandler.setState({  
    //                   Galleryitems: resultData.d.results                                    
    //                 });
    //                 MasterResult.push(resultData.d.results);
    //                 console.log(resultData.d.results);
    //               }              
    //             },
    //             error: function (error) {
    //                 console.log(JSON.stringify(error));
    //             }
    //         });

  }
  public findValueInArray(value,arr){
    var result = false;
   
    for(var i=0; i<arr.length; i++){
      var name = arr[i];
      if(name == value){
        result = true;
        break;
      }
    }
    return result;
  }
  public render(): React.ReactElement<IPicGalleryProps> {
    var url="/sites/POC/PracticeSite/PracticePictureLibrary/";
    var reactHandler = this;
    var x=1;
    let y=1;
    const Images: JSX.Element[] = this.state.Galleryitems.map(function(item,key) {   
      var filename=item.FileLeafRef;
      var completeurl=item.FileRef;                        
      var Len = filename.length; 
      var Dot = filename.lastIndexOf(".");
      var type = Len - Dot;
      var res = filename.substring(Dot+1, Len);
					  
      if(item.FileSystemObjectType==1)
      { 
        console.log(item);
        var string=completeurl.split('/'); 
        var str = completeurl;
        var my = str.split("/").slice(0, -1).join("/") + "/";
      if(my==url){
      }
      else{
           return(
           
                  <div className="col-md-6">
                  <div className="section-part">
                  <ul className="clearfix image-gallery image-gallery-home">
                    <li> 
                          
                    <a className="relative image-hover-gal" href={reactHandler.props.siteurl+"/SitePages/Gallery-Grid-View.aspx?env=WebView&FolderName='"+gFolderUrl+"'&Type=Img"} data-interception="off"> \
                    <img src="https://tmxin.sharepoint.com/sites/POC/PracticeSite/PracticePictureLibrary/NadeemAlam/flder.png" alt={filename}/>
                    <p className="folder-name">{filename}</p> 
                     </a>  
                                    
                  </li> 
                  </ul>
                  </div>
                  </div>
        
          );
          }
                          
          }
          
      else if (item.FileSystemObjectType !=1)  
      {
        var string=completeurl.split('/'); 
        var str = completeurl;
        var my = str.split("/").slice(0, -2).join("/") + "/";
      if(my==url){
        var string=completeurl.split('/');    
        var str2 = "Videos";
        if(string.indexOf(str2) != -1){
            //console.log(str2 + " found");
        }else{                                                
        var foldernameval = string[string.length -2];                          
        var gFolderUrl=(completeurl).replace(filename,'');
        FolderNames.push(foldernameval);
		    if(reactHandler.findValueInArray(foldernameval,FolderNamesExits)){                 		
		    }
		    else{
			    if(reactHandler.findValueInArray(foldernameval,FolderNames)){
			      FolderNamesExits.push(foldernameval);			                        	 	
			        if(x<2){				                         						                         						                         		
                return (  
                  <div className="col-md-6">
                    <div className="section-part">
                    <ul className="clearfix image-gallery image-gallery-home">
                    <li>           
                    <a className="relative image-hover-gal" href={reactHandler.props.siteurl+"/SitePages/Gallery-Grid-View.aspx?env=WebView&FolderName='"+gFolderUrl+"'&Type=Img"} data-interception="off"> <img src={`${item.FileRef}`} alt={item.FileLeafRef}/> 
                     <p className="folder-name">{foldernameval}</p>
                   </a>                      
                  </li> 
                  </ul>
                  </div>
                  </div>                                                                    
                );					                         					                         					                            					                            
				      } 
              x+=1;
			      }
			    }	
        }
      }
	      }                               
    });
    return (
      <div className={ styles.picGallery }>
      


      <div className="section-part">
                                {Images}    
                                
                        </div>                        
      </div>
    );
  }
}
