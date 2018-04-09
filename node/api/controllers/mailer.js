/**
 * @argument mailInfo
 * receiverEmail: String
 * receiverName: String
 * mailType: String
 * agency: String
 * artwork:String
 * otp: String
 */
exports.sendMail = function (mailInfo) {
    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'merlionsharing@gmail.com',
            pass: 'merlionsharinganyone'
        }
    });

    var mailOptions

    switch (mailInfo.mailType) {

        case 'ConsentForSale':
            mailOptions = {
                from: "Artbook Co. <merlionsharing@gmail.com>",
                to: mailInfo.receiverEmail,
                subject: `Request for Consent from ${mailInfo.agency}`,
                html:
                    `<!DOCTYPE html>
         <html lang="it"><head><meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>Artbook Co.</title><!--
         
            --><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style type="text/css">
         
            #ko_onecolumnBlock_4 .textintenseStyle a, #ko_onecolumnBlock_4 .textintenseStyle a:link, #ko_onecolumnBlock_4 .textintenseStyle a:visited, #ko_onecolumnBlock_4 .textintenseStyle a:hover{
             color: #ffffff;
             text-decoration: none;
             font-weight: bold;
             text-decoration: none
         }
         
         #ko_onecolumnBlock_4 .textlightStyle a, #ko_onecolumnBlock_4 .textlightStyle a:link, #ko_onecolumnBlock_4 .textlightStyle a:visited, #ko_onecolumnBlock_4 .textlightStyle a:hover{
             color: #3F3D33;
             text-decoration: none;
             font-weight: bold;
             text-decoration: 
         }
         </style><style type="text/css">
         /* CLIENT-SPECIFIC STYLES */
         #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
         .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
         .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;} /* Force Hotmail to display normal line spacing */
         body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
         table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
         img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */
         
         /* RESET STYLES */
         body{margin:0; padding:0;}
         img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
         table{border-collapse:collapse !important;}
         body{height:100% !important; margin:0; padding:0; width:100% !important;}
         
         /* iOS BLUE LINKS */
         .appleBody a{color:#68440a; text-decoration: none;}
         .appleFooter a{color:#999999; text-decoration: none;}
         
         /* MOBILE STYLES */
         @media screen and (max-width: 525px) {
         
             /* ALLOWS FOR FLUID TABLES */
             table[class="wrapper"]{
               width:100% !important;
               min-width:0px !important;
           }
         
           /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
           td[class="mobile-hide"]{
               display:none;}
         
               img[class="mobile-hide"]{
                   display: none !important;
               }
         
               img[class="img-max"]{
                   width:100% !important;
                   max-width: 100% !important;
                   height:auto !important;
               }
         
               /* FULL-WIDTH TABLES */
               table[class="responsive-table"]{
                   width:100%!important;
               }
         
               /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
               td[class="padding"]{
                   padding: 10px 5% 15px 5% !important;
               }
         
               td[class="padding-copy"]{
                   padding: 10px 5% 10px 5% !important;
                   text-align: center;
               }
         
               td[class="padding-meta"]{
                   padding: 30px 5% 0px 5% !important;
                   text-align: center;
               }
         
               td[class="no-pad"]{
                   padding: 0 0 0px 0 !important;
               }
         
               td[class="no-padding"]{
                   padding: 0 !important;
               }
         
               td[class="section-padding"]{
                   padding: 10px 15px 10px 15px !important;
               }
         
               td[class="section-padding-bottom-image"]{
                   padding: 10px 15px 0 15px !important;
               }
         
               /* ADJUST BUTTONS ON MOBILE */
               td[class="mobile-wrapper"]{
                 padding: 10px 5% 15px 5% !important;
             }
         
             table[class="mobile-button-container"]{
                 margin:0 auto;
                 width:100% !important;
             }
         
             a[class="mobile-button"]{
                 width:80% !important;
                 padding: 15px !important;
                 border: 0 !important;
                 font-size: 16px !important;
             }
         
         }
         </style></head><body style="margin: 0; padding: 0;" bgcolor="#ffffff" align="center">
         
             <!-- PREHEADER -->
         
             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 530px;" id="ko_preheaderBlock_1"><tbody><tr><td bgcolor="#3F3D33" class="mobile-hide">
                 <div align="center" style="padding: 0px 15px 0px 15px;">
                     <table border="0" cellpadding="0" cellspacing="0" width="500" style="min-width: 500px;" class="wrapper"><!--Preheade/view on web TEXT --><tbody><tr><td style="padding: 10px 0px 10px 0px;">
                         <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td bgcolor="#3F3D33" width="50%" align="left" class="mobile-hide">
                             <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="left" style="padding: 0 0 5px 0; font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none;"><span style="color: #ffffff; text-decoration: none;">Artwork Co.<br></span></td>
                             </tr></tbody></table></td>
         
                             <td bgcolor="#3F3D33" width="50%" align="right" class="mobile-hide">
                                 <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="right" style="padding: 0 0 5px 0; font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none;"><a href="%5Bshow_link%5D" style="color: #ffffff;" target="_new"><span>View on web</span></a></td>
                                 </tr></tbody></table></td>
                             </tr></tbody></table></td>
                         </tr></tbody></table></div>
                     </td>
                 </tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" id="ko_onecolumnBlock_4"><tbody><tr class="row-a"><td bgcolor="#EDE8DA" align="center" class="section-padding" style="padding-top: 30px; padding-left: 15px; padding-bottom: 30px; padding-right: 15px;">
                     <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table"><tbody><tr><td>
                         <table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td>
                             <!-- TEXT -->
                             <table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" class="padding-copy" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33; padding-top: 0px;">Request from ${mailInfo.agency}<br></td>
                             </tr><tr><td align="left" class="padding-copy textlightStyle" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33;"><p>Dear ${mailInfo.receiverName}, ${mailInfo.agency} has reviewed the <i>${mailInfo.artwork}</i> you brought to them, and they are very willing to sell it on your behalf. If you agree with that, please go to your artwork management page and enter the code below</p></td>
                             </tr></tbody></table></td>
                         </tr><tr><td>
                             <table border="0" cellpadding="0" cellspacing="0" width="100%" id="ko_titleBlock_5"><tbody><tr class="row-a"><td bgcolor="#9C010F" align="center" class="section-padding" style="padding: 30px 15px 0px 15px;">
                                 <table border="0" cellpadding="0" cellspacing="0" width="500" style="padding: 0 0 20px 0;" class="responsive-table"><!-- CODE --><tbody><tr><td align="center" class="padding-copy" colspan="2" style="padding: 0 0 10px 0px; font-size: 35px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff;">${mailInfo.otp}</td>
                                 </tr></tbody></table></td>
                             </tr></tbody></table>
                             <!--  BUTTON -->
                             <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container"><tbody><tr><td align="center" style="padding: 25px 0 0 0;" class="padding-copy">
                                 <table border="0" cellspacing="0" cellpadding="0" class="responsive-table"><tbody><tr><td align="center"><a target="_new" class="mobile-button" style="display: inline-block; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; background-color: #9C010F; padding-top: 15px; padding-bottom: 15px; padding-left: 25px; padding-right: 25px; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-bottom: 3px solid #5f0109;" href="${mailInfo.link}">Click Here to Artwork Management Page<br></a></td>
                                 </tr></tbody></table></td>
                             </tr></tbody></table></td>
                         </tr></tbody></table></td>
                     </tr></tbody></table></td>
                 </tr></tbody></table>
                 <!-- FOOTER -->
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 500px;" id="ko_footerBlock_2"><tbody><tr><td bgcolor="#ffffff" align="center">
                     <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding: 20px 0px 20px 0px;">
                         <!-- UNSUBSCRIBE -->
                         <table width="500" border="0" cellspacing="0" cellpadding="0" align="center" class="responsive-table"><tbody><tr><td align="center" valign="middle" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33;">
                             <span class="appleFooter" style="color: #3F3D33;">Artbook Co. Singapore</span><br><a class="original-only" href="%5Bprofile_link%5D" style="color: #3F3D33; text-decoration: none;" target="_new">Unsubscribe</a><span class="original-only" style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">   |   </span><a href="%5Bshow_link%5D" style="color: #3F3D33; text-decoration: none;" target="_new">View on web browser</a>
                         </td>
                     </tr></tbody></table></td>
                 </tr></tbody></table></td>
             </tr></tbody></table></body></html>
         `
            }
            break;
        case 'BuyerPayment':
            mailOptions = {
                from: "Artbook Co. <merlionsharing@gmail.com>",
                to: mailInfo.receiverEmail,
                subject: "Request for Payment from ${mailInfo.agency}",
                html: `<!DOCTYPE html>
        <html lang="it"><head><meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>Artbook Co.</title><!--
        
         --><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style type="text/css">
        
         #ko_onecolumnBlock_4 .textintenseStyle a, #ko_onecolumnBlock_4 .textintenseStyle a:link, #ko_onecolumnBlock_4 .textintenseStyle a:visited, #ko_onecolumnBlock_4 .textintenseStyle a:hover{
          color: #ffffff;
          text-decoration: none;
          font-weight: bold;
          text-decoration: none
        }
        
        #ko_onecolumnBlock_4 .textlightStyle a, #ko_onecolumnBlock_4 .textlightStyle a:link, #ko_onecolumnBlock_4 .textlightStyle a:visited, #ko_onecolumnBlock_4 .textlightStyle a:hover{
          color: #3F3D33;
          text-decoration: none;
          font-weight: bold;
          text-decoration: 
        }
        </style><style type="text/css">
        /* CLIENT-SPECIFIC STYLES */
        #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
        .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;} /* Force Hotmail to display normal line spacing */
        body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
        table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
        img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */
        
        /* RESET STYLES */
        body{margin:0; padding:0;}
        img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
        table{border-collapse:collapse !important;}
        body{height:100% !important; margin:0; padding:0; width:100% !important;}
        
        /* iOS BLUE LINKS */
        .appleBody a{color:#68440a; text-decoration: none;}
        .appleFooter a{color:#999999; text-decoration: none;}
        
        /* MOBILE STYLES */
        @media screen and (max-width: 525px) {
        
          /* ALLOWS FOR FLUID TABLES */
          table[class="wrapper"]{
            width:100% !important;
            min-width:0px !important;
          }
        
          /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
          td[class="mobile-hide"]{
            display:none;}
        
            img[class="mobile-hide"]{
              display: none !important;
            }
        
            img[class="img-max"]{
              width:100% !important;
              max-width: 100% !important;
              height:auto !important;
            }
        
            /* FULL-WIDTH TABLES */
            table[class="responsive-table"]{
              width:100%!important;
            }
        
            /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
            td[class="padding"]{
              padding: 10px 5% 15px 5% !important;
            }
        
            td[class="padding-copy"]{
              padding: 10px 5% 10px 5% !important;
              text-align: center;
            }
        
            td[class="padding-meta"]{
              padding: 30px 5% 0px 5% !important;
              text-align: center;
            }
        
            td[class="no-pad"]{
              padding: 0 0 0px 0 !important;
            }
        
            td[class="no-padding"]{
              padding: 0 !important;
            }
        
            td[class="section-padding"]{
              padding: 10px 15px 10px 15px !important;
            }
        
            td[class="section-padding-bottom-image"]{
              padding: 10px 15px 0 15px !important;
            }
        
            /* ADJUST BUTTONS ON MOBILE */
            td[class="mobile-wrapper"]{
              padding: 10px 5% 15px 5% !important;
            }
        
            table[class="mobile-button-container"]{
              margin:0 auto;
              width:100% !important;
            }
        
            a[class="mobile-button"]{
              width:80% !important;
              padding: 15px !important;
              border: 0 !important;
              font-size: 16px !important;
            }
        
          }
        </style></head><body style="margin: 0; padding: 0;" bgcolor="#ffffff" align="center">
        
          <!-- PREHEADER -->
        
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 530px;" id="ko_preheaderBlock_1"><tbody><tr><td bgcolor="#3F3D33" class="mobile-hide">
            <div align="center" style="padding: 0px 15px 0px 15px;">
              <table border="0" cellpadding="0" cellspacing="0" width="500" style="min-width: 500px;" class="wrapper"><!--Preheade/view on web TEXT --><tbody><tr><td style="padding: 10px 0px 10px 0px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td bgcolor="#3F3D33" width="50%" align="left" class="mobile-hide">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="left" style="padding: 0 0 5px 0; font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none;"><span style="color: #ffffff; text-decoration: none;">Artwork Co.<br></span></td>
                  </tr></tbody></table></td>
        
                  <td bgcolor="#3F3D33" width="50%" align="right" class="mobile-hide">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="right" style="padding: 0 0 5px 0; font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none;"><a href="%5Bshow_link%5D" style="color: #ffffff;" target="_new"><span>View on web</span></a></td>
                    </tr></tbody></table></td>
                  </tr></tbody></table></td>
                </tr></tbody></table></div>
              </td>
            </tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" id="ko_onecolumnBlock_4"><tbody><tr class="row-a"><td bgcolor="#EDE8DA" align="center" class="section-padding" style="padding-top: 30px; padding-left: 15px; padding-bottom: 30px; padding-right: 15px;">
              <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table"><tbody><tr><td>
                <table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td>
                  <!-- TEXT -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" class="padding-copy" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33; padding-top: 0px;">Request from ${mailInfo.agency}<br></td>
                  </tr><tr><td align="left" class="padding-copy textlightStyle" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33;"><p>Dear ${mailInfo.receiverName}, ${mailInfo.agency} initiated the sale of <i>${mailInfo.artwork}</i> to you. Please click the button below to go to our payment partner's page to pay the earnest.</p></td>
                  </tr></tbody></table></td>
                </tr><tr><td>
                </td>
              </tr></tbody></table>
              <!--  BUTTON -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container"><tbody><tr><td align="center" style="padding: 25px 0 0 0;" class="padding-copy">
                <table border="0" cellspacing="0" cellpadding="0" class="responsive-table"><tbody><tr><td align="center"><a target="_new" class="mobile-button" style="display: inline-block; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; background-color: #9C010F; padding-top: 15px; padding-bottom: 15px; padding-left: 25px; padding-right: 25px; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-bottom: 3px solid #5f0109;" href="${mailInfo.link}">Go to ArtsyCoin's Payment Page<br></a></td>
                </tr></tbody></table></td>
              </tr></tbody></table></td>
            </tr></tbody></table></td>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="ko_titleBlock_5"><tbody><tr class="row-a"><td bgcolor="#9C010F" align="center" class="section-padding" style="padding: 30px 15px 0px 15px;">
              <table border="0" cellpadding="0" cellspacing="0" width="500" style="padding: 0 0 20px 0; color: white" class="responsive-table"><!-- TITLE --><tbody><tr><td align="center" class="padding-copy" colspan="2" style="padding: 0 0 10px 0px; font-size: 25px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff;">Artwork Details      
                <tr><td>Title:</td><td>${mailInfo.artwork}</td></td></tr>
                <tr><td>Artist:</td><td>${mailInfo.artist}</td></td></tr>
                <tr><td>Creation Time:</td><td>${mailInfo.createTime}</td></td></tr>
                <tr><td>Description:</td><td>${mailInfo.description}</td></tr>
                <tr><td>Description:</td><td>$ ${mailInfo.price}</td></tr>             
                <tr><td><br></td></tr>
                <tr><td><br></td></tr>
              </td></tr>
            </td>
          </tr></tbody></table>
        </tr></tbody></table></td>
        </tr></tbody></table>
        
        <!-- FOOTER -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 500px;" id="ko_footerBlock_2"><tbody><tr><td bgcolor="#ffffff" align="center">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding: 20px 0px 20px 0px;">
            <!-- UNSUBSCRIBE -->
            <table width="500" border="0" cellspacing="0" cellpadding="0" align="center" class="responsive-table"><tbody><tr><td align="center" valign="middle" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33;">
              <span class="appleFooter" style="color: #3F3D33;">Artbook Co. Singapore</span><br><a class="original-only" href="%5Bprofile_link%5D" style="color: #3F3D33; text-decoration: none;" target="_new">Unsubscribe</a><span class="original-only" style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">   |   </span><a href="%5Bshow_link%5D" style="color: #3F3D33; text-decoration: none;" target="_new">View on web browser</a>
            </td>
          </tr></tbody></table></td>
        </tr></tbody></table></td>
        </tr></tbody></table></body></html>`
            }
            break;

        case 'ConsentTransfer':
            mailOptions = {
                from: "Artbook Co. <merlionsharing@gmail.com>",
                to: mailInfo.receiverEmail,
                subject: `Request for Consent from ${mailInfo.agency}`,
                html: `<!DOCTYPE html>
                <html lang="it"><head><meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>Artbook Co.</title><!--
                
                 --><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style type="text/css">
                
                 #ko_onecolumnBlock_4 .textintenseStyle a, #ko_onecolumnBlock_4 .textintenseStyle a:link, #ko_onecolumnBlock_4 .textintenseStyle a:visited, #ko_onecolumnBlock_4 .textintenseStyle a:hover{
                  color: #ffffff;
                  text-decoration: none;
                  font-weight: bold;
                  text-decoration: none
                }
                
                #ko_onecolumnBlock_4 .textlightStyle a, #ko_onecolumnBlock_4 .textlightStyle a:link, #ko_onecolumnBlock_4 .textlightStyle a:visited, #ko_onecolumnBlock_4 .textlightStyle a:hover{
                  color: #3F3D33;
                  text-decoration: none;
                  font-weight: bold;
                  text-decoration: 
                }
                </style><style type="text/css">
                /* CLIENT-SPECIFIC STYLES */
                #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
                .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
                .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;} /* Force Hotmail to display normal line spacing */
                body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
                table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
                img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */
                
                /* RESET STYLES */
                body{margin:0; padding:0;}
                img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
                table{border-collapse:collapse !important;}
                body{height:100% !important; margin:0; padding:0; width:100% !important;}
                
                /* iOS BLUE LINKS */
                .appleBody a{color:#68440a; text-decoration: none;}
                .appleFooter a{color:#999999; text-decoration: none;}
                
                /* MOBILE STYLES */
                @media screen and (max-width: 525px) {
                
                  /* ALLOWS FOR FLUID TABLES */
                  table[class="wrapper"]{
                    width:100% !important;
                    min-width:0px !important;
                  }
                
                  /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
                  td[class="mobile-hide"]{
                    display:none;}
                
                    img[class="mobile-hide"]{
                      display: none !important;
                    }
                
                    img[class="img-max"]{
                      width:100% !important;
                      max-width: 100% !important;
                      height:auto !important;
                    }
                
                    /* FULL-WIDTH TABLES */
                    table[class="responsive-table"]{
                      width:100%!important;
                    }
                
                    /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
                    td[class="padding"]{
                      padding: 10px 5% 15px 5% !important;
                    }
                
                    td[class="padding-copy"]{
                      padding: 10px 5% 10px 5% !important;
                      text-align: center;
                    }
                
                    td[class="padding-meta"]{
                      padding: 30px 5% 0px 5% !important;
                      text-align: center;
                    }
                
                    td[class="no-pad"]{
                      padding: 0 0 0px 0 !important;
                    }
                
                    td[class="no-padding"]{
                      padding: 0 !important;
                    }
                
                    td[class="section-padding"]{
                      padding: 10px 15px 10px 15px !important;
                    }
                
                    td[class="section-padding-bottom-image"]{
                      padding: 10px 15px 0 15px !important;
                    }
                
                    /* ADJUST BUTTONS ON MOBILE */
                    td[class="mobile-wrapper"]{
                      padding: 10px 5% 15px 5% !important;
                    }
                
                    table[class="mobile-button-container"]{
                      margin:0 auto;
                      width:100% !important;
                    }
                
                    a[class="mobile-button"]{
                      width:80% !important;
                      padding: 15px !important;
                      border: 0 !important;
                      font-size: 16px !important;
                    }
                
                  }
                </style></head><body style="margin: 0; padding: 0;" bgcolor="#ffffff" align="center">
                
                  <!-- PREHEADER -->
                
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 530px;" id="ko_preheaderBlock_1"><tbody><tr><td bgcolor="#3F3D33" class="mobile-hide">
                    <div align="center" style="padding: 0px 15px 0px 15px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="500" style="min-width: 500px;" class="wrapper"><!--Preheade/view on web TEXT --><tbody><tr><td style="padding: 10px 0px 10px 0px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td bgcolor="#3F3D33" width="50%" align="left" class="mobile-hide">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="left" style="padding: 0 0 5px 0; font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none;"><span style="color: #ffffff; text-decoration: none;">Artwork Co.<br></span></td>
                          </tr></tbody></table></td>
                
                          <td bgcolor="#3F3D33" width="50%" align="right" class="mobile-hide">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="right" style="padding: 0 0 5px 0; font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none;"><a href="%5Bshow_link%5D" style="color: #ffffff;" target="_new"><span>View on web</span></a></td>
                            </tr></tbody></table></td>
                          </tr></tbody></table></td>
                        </tr></tbody></table></div>
                      </td>
                    </tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" id="ko_onecolumnBlock_4"><tbody><tr class="row-a"><td bgcolor="#EDE8DA" align="center" class="section-padding" style="padding-top: 30px; padding-left: 15px; padding-bottom: 30px; padding-right: 15px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table"><tbody><tr><td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td>
                          <!-- TEXT -->
                          <table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" class="padding-copy" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33; padding-top: 0px;">Request from ${mailInfo.agency}<br></td>
                          </tr><tr><td align="left" class="padding-copy textlightStyle" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33;"><p>Dear ${mailInfo.receiverName}, ${mailInfo.agency} has found a buyer for <i>${mailInfo.artwork}</i> at price $${mailInfo.price}. The payment will go to your account after you confirm this sale.</p></td>
                          </tr></tbody></table></td>
                        </tr><tr><td>
                        </td>
                      </tr></tbody></table>
                      <!--  BUTTON -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container"><tbody><tr><td align="center" style="padding: 25px 0 0 0;" class="padding-copy">
                        <table border="0" cellspacing="0" cellpadding="0" class="responsive-table"><tbody><tr><td align="center"><a target="_new" class="mobile-button" style="display: inline-block; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; background-color: #9C010F; padding-top: 15px; padding-bottom: 15px; padding-left: 25px; padding-right: 25px; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-bottom: 3px solid #5f0109;" href="${mailInfo.link}">Confirm the Transfer<br></a></td>
                        </tr></tbody></table></td>
                      </tr></tbody></table></td>
                    </tr></tbody></table></td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="ko_titleBlock_5"><tbody><tr class="row-a"><td bgcolor="#9C010F" align="center" class="section-padding" style="padding: 30px 15px 0px 15px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="500" style="padding: 0 0 20px 0; color: white" class="responsive-table"><!-- TITLE --><tbody><tr><td align="center" class="padding-copy" colspan="2" style="padding: 0 0 10px 0px; font-size: 25px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff;">
                      </td> </tr>
                    </td>
                  </tr></tbody></table>
                </tr></tbody></table></td>
                </tr></tbody></table>
                
                <!-- FOOTER -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 500px;" id="ko_footerBlock_2"><tbody><tr><td bgcolor="#ffffff" align="center">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding: 20px 0px 20px 0px;">
                    <!-- UNSUBSCRIBE -->
                    <table width="500" border="0" cellspacing="0" cellpadding="0" align="center" class="responsive-table"><tbody><tr><td align="center" valign="middle" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33;">
                      <span class="appleFooter" style="color: #3F3D33;">Artbook Co. Singapore</span><br><a class="original-only" href="%5Bprofile_link%5D" style="color: #3F3D33; text-decoration: none;" target="_new">Unsubscribe</a><span class="original-only" style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">   |   </span><a href="%5Bshow_link%5D" style="color: #3F3D33; text-decoration: none;" target="_new">View on web browser</a>
                    </td>
                  </tr></tbody></table></td>
                </tr></tbody></table></td>
                </tr></tbody></table></body></html>
                `
            };
            break;
        default:
            console.log(`Invalid Mail Type: ${mailInfo.mailType}`)
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response + ' delivered to:' + receiver.email);
        }
    });
}
