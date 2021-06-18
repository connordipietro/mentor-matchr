/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable no-new-func */
/* eslint-disable no-eval */
import { PropTypes } from 'prop-types';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
// Themes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-terminal';
// Languages
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-sass';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-handlebars';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-coffee';
import 'ace-builds/src-noconflict/mode-css';
// Import options
import 'ace-builds/src-noconflict/ext-language_tools';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import * as Babel from '@babel/standalone';
import { useState } from 'react';
import useTextEditor from '../../utilities/useTextEditor';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const defaultThemes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'terminal',
];

const defaultLanguages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'coffee',
  'css',
];

export default function TextEditor({ userData }) {
  const { matchId, senderEmail } = userData;

  const {
    editorText,
    sendText,
    editorTheme,
    sendTheme,
    editorLanguage,
    sendLanguage,
  } = useTextEditor(matchId, senderEmail);

  const [error, setError] = useState('');

  const classes = useStyles();

  const handleThemeChange = (evt) => {
    sendTheme(evt.target.value);
  };

  const handleLanguageChange = (evt) => {
    sendLanguage(evt.target.value);
  };

  async function onChange(newValue) {
    sendText(newValue);
  }

  const transformCode = (code) => {
    try {
      return Babel.transform(code, {
        presets: ['env'],
      }).code;
    } catch (e) {
      const htmlstring = e.toString().replace(/(\r\n|\n|\r)/gm, ' <br /> ');
      const parsedHtml = <div> {ReactHtmlParser(htmlstring)} </div>;
      setError(parsedHtml);
      // todo: handle error
      return code;
    }
  };

  const handleCompile = () => {
    transformCode(editorText.body);
  };

  return (
    <>
      <Container>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-helper-label">Theme</InputLabel>
          <Select
            labelId="select-helper-label"
            id="select-helper"
            value={editorTheme}
            onChange={handleThemeChange}
          >
            {defaultThemes.map((themeName) => (
              <MenuItem key={themeName} value={themeName}>
                {themeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-helper-label">Lanuage</InputLabel>
          <Select
            labelId="select-helper-label"
            id="select-helper"
            value={editorLanguage}
            onChange={handleLanguageChange}
          >
            {defaultLanguages.map((languageName) => (
              <MenuItem key={languageName} value={languageName}>
                {languageName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>

      <Container>
        <AceEditor
          mode={editorLanguage}
          highlightActiveLine
          theme={editorTheme}
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          value={editorText.body}
          editorProps={{ $blockScrolling: true }}
          enableLiveAutocompletion
          fontSize={14}
          width="100%"
          setOptions={{
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            showPrintMargin: false,
          }}
        />
      </Container>
      <br />
      {editorLanguage === 'javascript' ? (
        <Container maxWdith="md">
          <Button variant="outlined" onClick={() => handleCompile()}>
            Eval JS
          </Button>
          <br />
          <Typography variant="h6">JS Error Console:</Typography>
          <br />
          <div>{error}</div>
        </Container>
      ) : null}
    </>
  );
}

TextEditor.propTypes = {
  userData: PropTypes.object,
};
