from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import braintree

# Create your views here.
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="45nx273rmy39r3rn",
        public_key="3nmrm9ysntyzg9rj",
        private_key="9cdec1623b478763b081fa96e38772ff"
    )
)


def validate_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True

        return False
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def generate_token(request, id, token):
    if not validate_session(id, token):
        return JsonResponse({"Error": "Invalid Session Login Again!"})

    # pass client_token to your front-end

    return JsonResponse({"Token": gateway.client_token.generate(), "Success": "True"})


@csrf_exempt
def process_payment(request, id, token):
    if not validate_session(id, token):
        return JsonResponse({"Error": "Invalid Session Login Again!"})

    nonce_from_client = request.POST['paymentMethodNonce']
    amount_from_client = request.POST['amount']

    result = gateway.transaction.sale({
        "amount": amount_from_client,
        "payment_method_nonce": nonce_from_client,
        "options": {
            "submit_for_settlement": True
        }
    })
    if result.is_success:
        return JsonResponse({
            "Success": result.is_success,
            "transaction": {
                "id": result.transaction.id,
                "amount": result.transaction.amount
            }
        })

    else:
        return JsonResponse({"Error": True,
                             "Success": False})
