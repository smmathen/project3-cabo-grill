
// import styles from '../styles/Home.module.css'
import React, { useContext, useEffect } from 'react'

export default function Translate() {

    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, [])

    const googleTranslateElementInit = () => {

        new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages : "af,ach,ak,am,ar,az,be,bem,bg,bh,bn,br,bs,ca,chr,ckb,co,crs,cs,cy,da,de,ee,el,en,eo,es,es-419,et,eu,fa,fi,fo,fr,fy,ga,gaa,gd,gl,gn,gu,ha,haw,hi,hr,ht,hu,hy,ia,id,ig,is,it,iw,ja,jw,ka,kg,kk,km,kn,ko,kri,ku,ky,la,lg,ln,lo,loz,lt,lua,lv,mfe,mg,mi,mk,ml,mn,mo,mr,ms,mt,ne,nl,nn,no,nso,ny,nyn,oc,om,or,pa,pcm,pl,ps,pt-BR,pt-PT,qu,rm,rn,ro,ru,rw,sd,sh,si,sk,sl,sn,so,sq,sr,sr-ME,st,su,sv,sw,ta,te,tg,th,ti,tk,tl,tn,to,tr,tt,tum,tw,ug,uk,ur,uz,vi,wo,xh,xx-bork,xx-elmer,xx-hacker,xx-klingon,xx-pirate,yi,yo,zh-CN,zh-TW,zu", // include this for selected languages
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element');

    }

    return (
        <div /*className={styles.container}*/>

            <div id="google_translate_element" > </div>

        </div>
    )
}


/*
import React, { Component } from "react";
import cookie from "react-cookies";

import { googleTranslate } from "../translate_key";

class translate extends Component {
  state = {
    languageCodes: [],
    language: cookie.load("language") ? cookie.load("language") : "en",
    question: cookie.load("question")
      ? cookie.load("question")
      : "What language do you prefer to read with?"
  };

  componentDidMount() {
    // load all of the language options from Google Translate to your app state

    googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
      getLanguageCodes(languageCodes); // use a callback function to setState
    });

    const getLanguageCodes = languageCodes => {
      this.setState({ languageCodes });
    };
  }

  render() {
    const { languageCodes, language, question } = this.state;

    return (
      <div style={this.divStyle}>
        <p>{question}</p>

        <select
          className="select-language"
          value={language}
          onChange={e => this.changeHandler(e.target.value)}
        >
          {languageCodes.map(lang => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  changeHandler = language => {
    let { question } = this.state;
    let cookieLanguage = cookie.load("language");
    let transQuestion = "";

    const translating = transQuestion => {
      if (question !== transQuestion) {
        this.setState({ question: transQuestion });
        cookie.save("question", transQuestion, { path: "/" });
      }
    };

    // translate the question when selecting a different language
    if (language !== cookieLanguage) {
      googleTranslate.translate(question, language, function(err, translation) {
        transQuestion = translation.translatedText;
        translating(transQuestion);
      });
    }

    this.setState({ language });
    cookie.save("language", language, { path: "/" });
  };

  // just some inline css to center our demo
  divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100wh"
  };
}

export default translate;

*/
