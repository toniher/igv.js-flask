import requests
import re
import os
import pprint
from flask import Response, make_response, request, abort, render_template, url_for, Blueprint
from igvjs._config import basedir

seen_tokens = set()

igvjs_blueprint = Blueprint('igvjs', __name__)

# give blueprint access to app config
@igvjs_blueprint.record
def record_igvjs(setup_state):
    igvjs_blueprint.config = setup_state.app.config;

# routes
@igvjs_blueprint.route('/')
def show_vcf():
    return render_template('igv.html')

@igvjs_blueprint.before_app_request
def before_request():
    
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint( request.path )
    
    if igvjs_blueprint.config['USES_OAUTH'] and (not igvjs_blueprint.config['PUBLIC_DIR'] or \
            not os.path.exists('.'+igvjs_blueprint.config['PUBLIC_DIR']) or \
            not request.path.startswith(igvjs_blueprint.config['PUBLIC_DIR'])):
        auth = request.headers.get("Authorization", None)
	#print auth
        if auth:
            token = auth.split()[1]
            if token not in seen_tokens:
                google_url = 'https://www.googleapis.com/oauth2/v1/userinfo'
                params = {'access_token':token}
                res = requests.get(google_url, params=params)
                email = res.json()['email']
                if email in allowed_emails():
                    seen_tokens.add(token)
                else:
                    abort(403)
        else:
            if "static/data" in request.path and "data/static/data" not in request.path:
                pp.pprint( "triggered error" )
                abort(401)
                
    if request.args.get('file'):
        filename = request.args.get('file')
        pp.pprint( "FILE" )
        pp.pprint( filename )
    
        return ranged_data_response(request.headers.get('Range', None), filename, True )

    else :
        return ranged_data_response(request.headers.get('Range', None), request.path[1:], False )


@igvjs_blueprint.route('/download/<filename>')
def download(filename):
   
    pp = pprint.PrettyPrinter(indent=4)
    range_header = request.headers.get('Range', None)
    pp.pprint( range_header )
 
    mimetype = "application/octet-stream"

    pp.pprint( filename )
    
    if filename.endswith( ".bedGraph" ) :
        mimetype = "text/plain"


    with open(igvjs_blueprint.config['DATA_PATH']+"/"+filename, 'rb') as f:
        body = f.read()
    
    response = make_response(body)
    response.headers["Content-type"] = mimetype
    response.headers["Content-Disposition"] = "attachment; filename="+filename

    return response

@igvjs_blueprint.route('/down')
def down():
   
    pp = pprint.PrettyPrinter(indent=4)
    range_header = request.headers.get('Range', None)
    pp.pprint( range_header )
 
    filename = None
 
    if request.args.get('file'):
        filename = request.args.get('file')
 
    mimetype = "application/octet-stream"

    pp.pprint( filename )
    
    if filename :
    
        if filename.endswith( ".bedGraph" ) :
            mimetype = "text/plain"
    
    
        with open(igvjs_blueprint.config['DATA_PATH']+"/"+filename, 'rb') as f:
            body = f.read()
        
        response = make_response(body)
        response.headers["Content-type"] = mimetype
        response.headers["Content-Disposition"] = "attachment; filename="+filename

        return response

    else :
        
        return False

def allowed_emails():
    emails = []
    if os.path.isfile(app.config['ALLOWED_EMAILS']):
        with open(app.config['ALLOWED_EMAILS'], 'r') as f:
            for line in f:
                emails.append(line.strip())
    return emails

def ranged_data_response(range_header, rel_path, param):
    
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint( basedir )
    pp.pprint( range_header )
    pp.pprint( rel_path )

    if rel_path.startswith("download/") :
        filename = rel_path.replace("download/", "")
        path = igvjs_blueprint.config['DATA_PATH']+"/"+filename
    else :
        if param :
            path = igvjs_blueprint.config['DATA_PATH']+"/"+rel_path
        else :
            path = os.path.join(basedir, rel_path)
    
    if not range_header:
        return None
    m = re.search('(\d+)-(\d*)', range_header)
    if not m:
        return "Error: unexpected range header syntax: {}".format(range_header)
    size = os.path.getsize(path)
    offset = int(m.group(1))
    length = int(m.group(2) or size) - offset + 1
    
    pp = pprint.PrettyPrinter(indent=4)

    pp.pprint( offset )
    pp.pprint( length )

    data = None
    with open(path, 'rb') as f:
        f.seek(offset)
        data = f.read(length)
    rv = Response(data, 206, mimetype="application/octet-stream", direct_passthrough=True)
    rv.headers['Content-Range'] = 'bytes {0}-{1}/{2}'.format(offset, offset + length-1, size)
    return rv
